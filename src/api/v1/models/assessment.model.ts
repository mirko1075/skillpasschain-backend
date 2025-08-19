// src/api/v1/models/assessment.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface QuestionInstance {
  question: string;
  options: string[];
  answer: string; // correct answer
  userAnswer?: string; // filled when answering
}

export interface IAssessment extends Document {
  user: mongoose.Types.ObjectId;
  topic: mongoose.Types.ObjectId;
  currentLevel: number;
  highestLevelCompleted: number;
  status: 'in-progress' | 'completed' | 'failed';
  score: number;
  passThreshold: number;
  questions: QuestionInstance[];
  startedAt: Date;
  completedAt?: Date;
}

const AssessmentSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    currentLevel: { type: Number, default: 1 },
    highestLevelCompleted: { type: Number, default: 0 },
    status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
    score: { type: Number, default: 0 },
    passThreshold: { type: Number, default: 70 },
    questions: [
      {
        question: String,
        options: [String],
        answer: String,
        userAnswer: String,
      },
    ],
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IAssessment>('Assessment', AssessmentSchema);
