import { Schema, model, Document } from 'mongoose';

export interface IInstitution extends Document {
  name: string;
  email: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: Schema.Types.ObjectId; // Optional, if you want to track who created the institution
  updatedBy?: Schema.Types.ObjectId; // Optional, if you want to track
}

const institutionSchema = new Schema<IInstitution>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }, //
  },
  { timestamps: true },
);

export default model<IInstitution>('Institution', institutionSchema);
