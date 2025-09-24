import apiClient from '@/api/axios';
export const createPlan = async (planData) => {
    const response = await apiClient.post('/plans/create', planData);
    return response.data;
};
export const getPlans = async () => {
    const response = await apiClient.get('/plans/list');
    return response.data;
};
