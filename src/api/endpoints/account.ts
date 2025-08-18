import apiClient from '@/api/axios';
import { AccountPresignedUrlRequest, AccountPresignedUrlResponse } from '@/api/types/plofile';

export interface AccountInfo {
  slug?: string;
  display_name?: string;
  avatar_url?: string;
  cover_url?: string;
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
  description?: string;
  links?: Record<string, string>;
  avatar_url?: string;
  cover_url?: string;
}

/**
 * アカウント情報を取得
 * @returns AccountInfo
 */
export const getAccountInfo = (): Promise<AccountInfo> => {
  return apiClient.get('/account/info').then(response => response.data);
};

/**
 * アカウント情報を更新
 * @param data 
 * @returns 
 */
export const updateAccountInfo = (data: AccountUpdateRequest) => {
  return apiClient.put('/account/update', data).then(response => response.data);
};

/**
 * presigned URL を取得
 * @param request 
 * @returns AccountPresignedUrlResponse
 */
export const accountPresignedUrl = async (request: AccountPresignedUrlRequest) => {
  console.log(request);
  const { data } = await apiClient.post<AccountPresignedUrlResponse>('/account/presign-upload', request);
  return data;
};