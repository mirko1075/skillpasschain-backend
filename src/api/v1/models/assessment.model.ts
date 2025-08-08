import { Schema, model, Document, Types } from 'mongoose';

export interface IAssessment extends Document {
  title: string;
  description: string;
  createdBy: Types.ObjectId; // Institution or instructor
  questions: { question: string; answer: string }[];
}

const assessmentSchema = new Schema<IAssessment>(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    questions: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export default model<IAssessment>('Assessment', assessmentSchema);
