import apiClient from '@/api/axios';
export const signUp = async (form) => {
    const response = await apiClient.post('/users/register', form);
    return response.data;
};
/**
 * スラッグによるユーザープロフィール取得
 * @param slug ユーザースラッグ
 * @returns UserProfile
 */
export const getUserProfileByDisplayName = (displayName) => {
    console.log('displayName', displayName);
    return apiClient.get(`/users/profile?display_name=${displayName}`).then(response => response.data);
};
