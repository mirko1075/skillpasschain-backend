import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/skillpasschain",
  jwtSecret: process.env.JWT_SECRET || "supersecret",
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  generateAtTopicCreation: process.env.GENERATE_AT_TOPIC_CREATION === "true",
};
