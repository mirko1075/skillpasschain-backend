import Topic, { ITopic } from '../models/topic.model';

export const createTopic = async (data: Partial<ITopic>) => {
  return await Topic.create(data);
};

export const getAllTopics = async () => {
  return await Topic.find();
};

export const getTopicById = async (id: string) => {
  return await Topic.findById(id);
};

export const updateTopic = async (id: string, data: Partial<ITopic>) => {
  return await Topic.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTopic = async (id: string) => {
  return await Topic.findByIdAndDelete(id);
};

export const setTopicActive = async (id: string, isActive: boolean) => {
  return await Topic.findByIdAndUpdate(id, { isActive }, { new: true });
};

export const uploadDocument = async (id: string, documentUrl: string) => {
  return await Topic.findByIdAndUpdate(id, { documentUrl }, { new: true });
};
