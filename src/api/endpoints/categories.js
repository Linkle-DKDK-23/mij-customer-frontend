import apiClient from '../axios';
export const getGenres = async () => {
    const response = await apiClient.get('/categories/genres');
    return response.data;
};
export const getCategories = async () => {
    const response = await apiClient.get('/categories/categories');
    return response.data;
};
export const getRecommendedCategories = async () => {
    const response = await apiClient.get('/categories/recommended');
    return response.data;
};
export const getRecentCategories = async () => {
    const response = await apiClient.get('/categories/recent');
    return response.data;
};
