import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  name: string;
  description: string;
  levels: number; // Max levels for this topic
  isActive: boolean;
  referenceDocumentUrl?: string; // Optional uploaded doc link
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    levels: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean, default: true },
    referenceDocumentUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITopic>('Topic', TopicSchema);
