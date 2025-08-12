// src/api/v1/models/assessment.model.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IQuestion {
  level: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  scoreWeight: number;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface IAssessment extends Document {
  user: Types.ObjectId;
  topic: Types.ObjectId;
  currentLevel: number;
  highestLevelCompleted: number;
  status: 'in-progress' | 'completed' | 'failed';
  score: number;
  passThreshold: number;
  questions: IQuestion[];
  startedAt: Date;
  completedAt?: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    level: { type: Number, required: true },
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    scoreWeight: { type: Number, required: true },
    userAnswer: String,
    isCorrect: Boolean
  },
  { _id: false }
);

const AssessmentSchema = new Schema<IAssessment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    currentLevel: { type: Number, default: 1 },
    highestLevelCompleted: { type: Number, default: 0 },
    status: { type: String, enum: ['in-progress', 'completed', 'failed'], default: 'in-progress' },
    score: { type: Number, default: 0 },
    passThreshold: { type: Number, default: 70 },
    questions: [QuestionSchema],
    startedAt: { type: Date, default: Date.now },
    completedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model<IAssessment>('Assessment', AssessmentSchema);
