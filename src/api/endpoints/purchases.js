import apiClient from '@/api/axios';
export const createPurchase = async (request) => {
    console.log('request', request);
    const { data } = await apiClient.post('/purchases/create', request);
    return data;
};
