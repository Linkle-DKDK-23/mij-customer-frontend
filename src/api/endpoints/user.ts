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
export const getUserProfileByDisplayName = (displayName: string): Promise<UserProfile> => {
  console.log('displayName', displayName);
  return apiClient.get(`/users/profile?display_name=${displayName}`).then(response => response.data);
};
