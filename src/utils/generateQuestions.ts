import { openai } from "@config/openaiclient";
import { sanitizeJson } from "@utils/jsonSanitizer";

/**
 * Generate a set of multiple-choice questions using ChatGPT.
 *
 * @param topicName - Name of the topic (e.g., "JavaScript")
 * @param level - Difficulty level (1 = easy, n = expert)
 * @param maxLevels - Total levels for the topic
 * @param documentContent - Optional content from uploaded document
 * @param count - Number of questions to generate
 */
export const generateQuestions = async (
  topicName: string,
  level: number,
  maxLevels: number,
  documentContent?: string,
  count: number = 50
) => {
  const prompt = `Generate ${count} multiple choice questions for ${topicName}.
Difficulty level: ${level} (1 = basic, ${maxLevels} = expert).
${documentContent ? `Use the following reference material:\n${documentContent}\n` : ""}
Format response as a JSON array where each object has:
{
  "question": string,
  "options": [string, string, string, string],
  "answer": string
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an AI that generates structured multiple-choice questions. Always return only valid JSON arrays. Do not add explanations.",
      },
      { role: "user", content: prompt },
    ],
  });

  const raw = response.choices[0]?.message?.content || "[]";
  return sanitizeJson(raw);
};
