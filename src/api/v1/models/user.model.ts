import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'institution_admin' | 'admin';
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'institution_admin', 'admin'], default: 'student' },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
