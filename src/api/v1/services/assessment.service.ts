// src/api/v1/services/assessment.service.ts
import { IAssessment, QuestionInstance } from '@v1/models/assessment.model';
import AssessmentRepository from '../repositories/assessment.repository';
import { Types } from 'mongoose';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
class AssessmentService {
  async getAll() {
    return AssessmentRepository.findAll();
  }
  async getById(id: string) {
    return AssessmentRepository.findById(id);
  }
  async startAssessment(userId: string, topicId: string, passThreshold = 70) {
    return AssessmentRepository.create({
      user: new Types.ObjectId(userId),
      topic: new Types.ObjectId(topicId),
      passThreshold,
      startedAt: new Date(),
      currentLevel: 1,
      highestLevelCompleted: 0,
      status: 'in-progress',
      questions: [],
    });
  }

  async submitAnswers(assessmentId: string, answers: { questionId: number; answer: string }[]) {
    const assessment: IAssessment | null = await AssessmentRepository.findById(assessmentId);
    if (!assessment) throw new Error('Assessment not found');

    let levelScore = 0;
    let totalWeight = 0;

    answers.forEach(({ questionId, answer }) => {
      const q = assessment.questions[questionId];
      if (!q) return;
      q.userAnswer = answer;
    });

    const levelPercentage = (levelScore / totalWeight) * 100;
    assessment.score += levelScore;

    if (levelPercentage >= assessment.passThreshold) {
      assessment.highestLevelCompleted = assessment.currentLevel;
      if (assessment.currentLevel < 10) {
        assessment.currentLevel += 1;
      } else {
        assessment.status = 'completed';
        assessment.completedAt = new Date();
      }
    } else {
      assessment.status = 'failed';
      assessment.completedAt = new Date();
    }

    return assessment.save();
  }

  async getUserAssessments(userId: string) {
    return AssessmentRepository.findByUser(userId);
  }

  async findAssessmentById(assessmentId: string) {
    return AssessmentRepository.findById(assessmentId);
  }

  async updateAssessment(id: string, data: Partial<IAssessment>) {
    return AssessmentRepository.update(id, data);
  }

  async deleteAssessment(id: string) {
    return AssessmentRepository.delete(id);
  }

   async getNextQuestions(assessmentId: string) {
    const assessment = await AssessmentRepository.findById(assessmentId).populate('topic');
    if (!assessment) throw new Error('Assessment not found');

    const topicName = (assessment.topic as any)?.name || 'General Knowledge';

    // Call ChatGPT API
    const prompt = `
      You are an expert quiz creator. Generate exactly 20 multiple-choice questions
      about "${topicName}" at difficulty level ${assessment.currentLevel} (1=very easy, 10=expert).
      Provide JSON array of objects with:
      {
        "questionText": "...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "scoreWeight": number
      }
    `;

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    let questions: QuestionInstance[] = [];

    try {
      questions = JSON.parse(aiResponse.choices[0].message.content || '[]');
    } catch (err) {
      throw new Error('Failed to parse AI response as JSON');
    }

    // Append level & save to DB
    questions = questions.map(q => ({
      ...q,
      level: assessment.currentLevel
    }));

    assessment.questions.push(...questions);
    await assessment.save();

    return questions;
  }
}

export default new AssessmentService();
