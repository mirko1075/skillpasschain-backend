// src/api/v1/services/assessment.service.ts
import AssessmentRepository from '../repositories/assessment.repository';
import { IAssessment, IQuestion } from '../models/assessment.model';
import { Types } from 'mongoose';

class AssessmentService {
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

  async getNextQuestions(assessmentId: string) {
    const assessment = await AssessmentRepository.findById(assessmentId);
    if (!assessment) throw new Error('Assessment not found');

    // Placeholder for ChatGPT or AI-generated questions
    // In production, call OpenAI API here with topic & level
    const mockQuestions: IQuestion[] = Array.from({ length: 20 }).map((_, i) => ({
      level: assessment.currentLevel,
      questionText: `Sample Question ${i + 1} for level ${assessment.currentLevel}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A', // In real AI call, this is determined dynamically
      scoreWeight: 5
    }));

    // Append to assessment
    assessment.questions.push(...mockQuestions);
    await assessment.save();

    return mockQuestions;
  }

  async submitAnswers(assessmentId: string, answers: { questionId: number; answer: string }[]) {
    const assessment = await AssessmentRepository.findById(assessmentId);
    if (!assessment) throw new Error('Assessment not found');

    let levelScore = 0;
    let totalWeight = 0;

    answers.forEach(({ questionId, answer }) => {
      const q = assessment.questions[questionId];
      if (!q) return;
      q.userAnswer = answer;
      q.isCorrect = q.correctAnswer === answer;
      if (q.isCorrect) levelScore += q.scoreWeight;
      totalWeight += q.scoreWeight;
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
}

export default new AssessmentService();
