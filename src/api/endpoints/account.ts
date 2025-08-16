import apiClient from '../axios';

export interface AccountInfo {
  slug?: string;
  display_name?: string;
  avatar_url?: string;
  followers_count: number;
  following_count: number;
  total_likes: number;
  pending_posts_count: number;
  rejected_posts_count: number;
  unpublished_posts_count: number;
  deleted_posts_count: number;
  approved_posts_count: number;
  total_sales: number;
  plan_count: number;
  total_plan_price: number;
}

export interface AccountUpdateRequest {
  name?: string;
  display_name?: string;
}

export const getAccountInfo = (): Promise<AccountInfo> => {
  return apiClient.get('/account/info').then(response => response.data);
};

export const updateAccountInfo = (data: AccountUpdateRequest) => {
  return apiClient.put('/account/update', data).then(response => response.data);
};
