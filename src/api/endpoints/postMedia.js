import apiClient from '@/api/axios';
export const postImagePresignedUrl = async (request) => {
    const { data } = await apiClient.post('/media-assets/presign-image-upload', request);
    return data;
};
export const postVideoPresignedUrl = async (request) => {
    const { data } = await apiClient.post('/media-assets/presign-video-upload', request);
    return data;
};
