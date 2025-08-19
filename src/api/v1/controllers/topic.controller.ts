import { Request, Response, NextFunction } from 'express';
import Topic from '@v1/models/topic.model';
import { ApiError } from 'errors/ApiError';
import { openai } from '@config/openaiclient';
import { sanitizeJson } from '@utils/jsonSanitizer';
import Assessment from '@v1/models/assessment.model';
import { config } from '@config/config';

class TopicController {
  createTopic = async (req: Request, res: Response) => {
    try {
      const { name, description, levels, isActive } = req.body;
      const createdBy = (req as any).user?.id;

      let questionPools: any[] = [];

      if (config.generateAtTopicCreation) {
        for (let level = 1; level <= levels; level++) {
          const questions = await this.generateQuestions(name, level, levels);
          questionPools.push({ level, questions });
        }
      }

      const topic = await Topic.create({
        name,
        description,
        levels,
        isActive,
        createdBy,
        questionPools,
      });

      res.status(201).json(topic);
    } catch (err: any) {
      console.error("Error creating topic:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
  getNextQuestions = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const assessment = await Assessment.findById(id).populate("topic");
      if (!assessment) {
        return res.status(404).json({ error: "Assessment not found" });
      }

      const topic: any = assessment.topic;
      const nextLevel = assessment.currentLevel + 1;

      if (nextLevel > topic.levels) {
        return res.status(400).json({ error: "No more levels available for this topic" });
      }

      const questions = await this.generateQuestions(
        topic.name,
        nextLevel,
        topic.levels,
        topic.documentContent
      );

      assessment.currentLevel = nextLevel;
      assessment.questions = questions;
      await assessment.save();

      res.json({ level: nextLevel, questions });
    } catch (err: any) {
      console.error("Error getting next questions:", err);
      res.status(500).json({ error: err.message });
    }
  };

  async generateQuestions(
    topicName: string,
    level: number,
    maxLevels: number,
    docContent?: string
  ) {
    const basePrompt = `Generate 20 multiple choice questions for ${topicName}, difficulty level ${level} (1 = beginner, ${maxLevels} = expert).
      Format strictly as JSON array with objects:
      { "question": string, "options": [string, string, string, string], "answer": string }`;

    const finalPrompt = docContent
      ? `Use the following reference material:\n${docContent}\n\n${basePrompt}`
      : basePrompt;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that generates structured multiple-choice questions. Always return only valid JSON arrays, no explanations.",
        },
        { role: "user", content: finalPrompt },
      ],
      temperature: 0.7,
    });

    const rawContent = response.choices[0]?.message?.content || "[]";
    return sanitizeJson(rawContent);
  };

  async getAllTopics(_req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await Topic.find();
      res.json(topics);
    } catch (error) {
      next(error);
    }
  };

  async getTopicById(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await Topic.findById(req.params.id);
      if (!topic) throw new ApiError(404, 'Topic not found');
      res.json(topic);
    } catch (error) {
      next(error);
    }
  };

  async updateTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!topic) throw new ApiError(404, 'Topic not found');
      res.json(topic);
    } catch (error) {
      next(error);
    }
  };

  async deleteTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await Topic.findByIdAndDelete(req.params.id);
      if (!topic) throw new ApiError(404, 'Topic not found');
      res.json({ message: 'Topic deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default new TopicController();