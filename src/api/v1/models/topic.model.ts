// src/api/v1/models/topic.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface LevelPool {
  level: number;
  questions: Question[];
}

export interface ITopic extends Document {
  name: string;
  description?: string;
  levels: number;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  documentUrl?: string;
  questionPools: LevelPool[];
  documentContent?: string;
}

const TopicSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    levels: { type: Number, required: true, default: 1 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    documentUrl: { type: String },
    questionPools: [
      {
        level: { type: Number, required: true },
        questions: [
          {
            question: { type: String, required: true },
            options: [{ type: String }],
            answer: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ITopic>('Topic', TopicSchema);
