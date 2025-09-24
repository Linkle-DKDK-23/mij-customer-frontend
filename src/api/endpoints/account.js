import apiClient from '@/api/axios';
/**
 * アカウント情報を取得
 * @returns AccountInfo
 */
export const getAccountInfo = () => {
    return apiClient.get('/account/info').then(response => response.data);
};
/**
 * アカウント情報を更新
 * @param data
 * @returns
 */
export const updateAccountInfo = (data) => {
    return apiClient.put('/account/update', data).then(response => response.data);
};
/**
 * presigned URL を取得
 * @param request
 * @returns AccountPresignedUrlResponse
 */
export const accountPresignedUrl = async (request) => {
    const { data } = await apiClient.post('/account/presign-upload', request);
    return data;
};
export const getAccountPosts = async () => {
    const { data } = await apiClient.get('/account/posts');
    return data;
};
