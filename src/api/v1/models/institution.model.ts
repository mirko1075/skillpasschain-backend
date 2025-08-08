import { Schema, model, Document } from 'mongoose';

export interface IInstitution extends Document {
  name: string;
  email: string;
  address?: string;
}

const institutionSchema = new Schema<IInstitution>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, trim: true },
  },
  { timestamps: true },
);

export default model<IInstitution>('Institution', institutionSchema);
