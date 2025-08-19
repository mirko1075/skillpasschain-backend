import { Schema, model, Document } from 'mongoose';
import { refreshAccessToken } from '../services/auth.service';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'institution_admin' | 'admin' | 'institution';
  avatarUrl: { type: String },
  refreshToken?: string; // Optional for storing refresh token
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'institution_admin', 'admin', 'institution'], default: 'student' },
    avatarUrl: { type: String },
    refreshToken: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model<IUser>('User', userSchema);
