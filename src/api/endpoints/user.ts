import apiClient from '@/api/axios';
import { SignUpForm } from '@/api/types/user';

export const signUp = async (form: SignUpForm) => {
  const response = await apiClient.post('/users/register', form);
  return response.data;
};