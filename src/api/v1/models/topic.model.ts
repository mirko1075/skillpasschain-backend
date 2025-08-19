import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  name: string;
  description: string;
  levels: number; // Max levels for this topic
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  referenceDocumentUrl?: string; // Optional uploaded doc link
  createdBy?: Schema.Types.ObjectId; // Optional, if you want to track who created the institution
  updatedBy?: Schema.Types.ObjectId; // Optional, if you want to track
}

const TopicSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    levels: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    referenceDocumentUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);

export default mongoose.model<ITopic>('Topic', TopicSchema);
