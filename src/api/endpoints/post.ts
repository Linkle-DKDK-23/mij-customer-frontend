import apiClient from '@/api/axios';
import { CreatePostRequest } from '@/api/types/post';

export const createPost = async (request: CreatePostRequest) => {
  const { data } = await apiClient.post('/post/create', request);
  return data;
};