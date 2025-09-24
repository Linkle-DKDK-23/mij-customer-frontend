import apiClient from '@/api/axios';
export const getTopPageData = () => {
    return apiClient.get('/top/').then(response => response.data);
};
