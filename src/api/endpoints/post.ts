import apiClient from '@/api/axios';
import { CreatePostRequest } from '@/api/types/post';

export const createPost = async (request: CreatePostRequest) => {
  const { data } = await apiClient.post('/post/create', request);
  return data;
};

export const getPostsByCategory = async (slug: string) => {
  const { data } = await apiClient.get(`/category?slug=${slug}`);
  return data;
};

export const getPostDetail = async (postId: string) => {
  const { data } = await apiClient.get(`/post/detail?post_id=${postId}`);
  return data;
};