import apiClient from '@/api/axios';
import { 
  AccountInfo, 
  AccountUpdateRequest, 
  AccountPresignedUrlRequest, 
  AccountPresignedUrlResponse,
  AccountPostStatusResponse
} from '@/api/types/account';

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
  const { data } = await apiClient.post<AccountPresignedUrlResponse>('/account/presign-upload', request);
  return data;
};

export const getAccountPosts = async (): Promise<AccountPostStatusResponse> => {
  const { data } = await apiClient.get<AccountPostStatusResponse>('/account/posts');
  return data;
};