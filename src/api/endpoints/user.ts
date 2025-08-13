import apiClient from '@/api/axios';
import { SignUpForm } from '@/api/types/user';

export const signUp = async (form: SignUpForm) => {
  const data = {
    email: form.email,
    password: form.password,
  };
  const response = await apiClient.post('/users/register', data);
  return response.data;
};