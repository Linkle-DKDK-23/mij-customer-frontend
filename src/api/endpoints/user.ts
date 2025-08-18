import apiClient from '@/api/axios';
import { SignUpForm } from '@/api/types/user';
import { UserProfile } from '@/api/types/profile';

export const signUp = async (form: SignUpForm) => {
  const response = await apiClient.post('/users/register', form);
  return response.data;
};

/**
 * スラッグによるユーザープロフィール取得
 * @param slug ユーザースラッグ
 * @returns UserProfile
 */
export const getUserProfileBySlug = (slug: string): Promise<UserProfile> => {
  return apiClient.get(`/users/profile/${slug}`).then(response => response.data);
};
