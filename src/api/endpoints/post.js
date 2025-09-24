import apiClient from '@/api/axios';
export const createPost = async (request) => {
    const { data } = await apiClient.post('/post/create', request);
    return data;
};
export const getPostsByCategory = async (slug) => {
    const { data } = await apiClient.get(`/category?slug=${slug}`);
    return data;
};
export const getPostDetail = async (postId) => {
    const { data } = await apiClient.get(`/post/detail?post_id=${postId}`);
    return data;
};
