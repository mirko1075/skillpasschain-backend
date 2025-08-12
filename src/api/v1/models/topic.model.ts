// src/api/v1/models/topic.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  name: string;
  description?: string;
}

const TopicSchema = new Schema<ITopic>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<ITopic>('Topic', TopicSchema);
