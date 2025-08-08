import { Schema, model, Document, Types } from 'mongoose';

export interface ICertification extends Document {
  title: string;
  description?: string;
  issuedBy: Types.ObjectId; // Institution
  recipient: Types.ObjectId; // User
  issueDate: Date;
  expiryDate?: Date;
}

const certificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    issuedBy: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
  },
  { timestamps: true },
);

export default model<ICertification>('Certification', certificationSchema);
