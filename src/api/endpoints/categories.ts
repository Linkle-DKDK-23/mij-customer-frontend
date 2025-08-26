import apiClient from '../axios';

export interface Category {
  id: string;
  slug: string;
  name: string;
  genre_id: string;
}

export interface Genre {
  id: string;
  slug: string;
  name: string;
}

export const getGenres = async (): Promise<Genre[]> => {
  const response = await apiClient.get('/categories/genres');
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories/categories');
  return response.data;
};

export const getRecommendedCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories/recommended');
  return response.data;
};

export const getRecentCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories/recent');
  return response.data;
};
