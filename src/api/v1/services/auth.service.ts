import User from '@v1/models/user.model';
import { hashPassword, comparePassword } from '@utils/password.util';
import { generateAccessToken, generateRefreshToken } from '@utils/jwt.util';
import { ApiError } from '../../../errors/ApiError'


export const register = async (firstName: string, lastName: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, 'Email already in use');

  const hashed = await hashPassword(password);
  const user = new User({ firstName, lastName, email, password: hashed });
  await user.save();

  return { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const user = await User.findOne({ refreshToken });
  if (!user) throw new ApiError(403, 'Invalid refresh token');

  const newAccessToken = generateAccessToken({ id: user._id, role: user.role });
  return { accessToken: newAccessToken };
};

export const logout = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};
