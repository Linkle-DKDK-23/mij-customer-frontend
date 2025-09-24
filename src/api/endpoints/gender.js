import apiClient from '@/api/axios';
export const getGenders = async () => {
    const response = await apiClient.get('/gender/');
    return response.data;
};
