// src/api/v1/controllers/assessment.controller.ts
import { Request, Response } from 'express';
import AssessmentService from '../services/assessment.service';
import Topic from '../models/topic.model';
import Assessment from '../models/assessment.model';
import { config } from '@config/config';
import { generateQuestions } from '@utils/generateQuestions';

function sampleArray<T>(arr: T[], count: number): T[] {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

class AssessmentController {
  async getAllAssessments(req: Request, res: Response) {
    try {
      const assessments = await AssessmentService.getAll();
      res.json(assessments);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  async getAssessmentById(req: Request, res: Response) {
    try {
      const assessment = await AssessmentService.getById(req.params.id);
      if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
      res.json(assessment);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  async startAssessment(req: Request, res: Response) {
    try {
      const { userId, topicId, passThreshold } = req.body;
      const assessment = await AssessmentService.startAssessment(userId, topicId, passThreshold);
      res.status(201).json(assessment);
    } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

  async getNextQuestions(req: Request, res: Response) {
  try {
    const { assessmentId } = req.params;
    const questions = await AssessmentService.getNextQuestions(assessmentId);
    res.json({ questions });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

async submitAnswers(req: Request, res: Response) {
  try {
    const { assessmentId } = req.params;
    const { answers } = req.body;
    const updated = await AssessmentService.submitAnswers(assessmentId, answers);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

async getUserAssessments(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const list = await AssessmentService.getUserAssessments(userId);
    res.json(list);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
  };
  

createAssessment = async (req: Request, res: Response) => {
  try {
    const { topicId, user } = req.body;
    const userId = user?.id;
    let questions: any[] = [];

    const topic = await Topic.findById(topicId);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    if (config.generateAtTopicCreation && topic.questionPools?.length) {
      // ✅ Reuse stored pool for level 1
      const pool = topic.questionPools.find((q: any) => q.level === 1);
      questions = pool?.questions || [];
    } else {
      // ✅ Generate fresh, randomized questions
      questions = await generateQuestions(topic.name, 1, topic.levels, topic.documentContent);
    }

    const assessment = await Assessment.create({
      user: userId,
      topic: topic._id,
      currentLevel: 1,
      highestLevelCompleted: 0,
      status: 'in-progress',
      score: 0,
      passThreshold: 70,
      questions: sampleArray(questions, 10), // ✅ Randomly select 10 questions
    });

    res.status(201).json(assessment);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
}

export default new AssessmentController();

