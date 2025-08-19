import { Schema, model, Document, Types } from 'mongoose';

export interface ICertification extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  issuedBy: Types.ObjectId; // Institution
  recipient: Types.ObjectId; // User
  issueDate: Date;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: Types.ObjectId; // Optional, if you want to track who created the certification
  updatedBy?: Types.ObjectId; // Optional, if you want to track who updated
}

const certificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    issuedBy: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model<ICertification>('Certification', certificationSchema);
