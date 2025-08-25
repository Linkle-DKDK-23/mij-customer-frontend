import apiClient from '@/api/axios';
import { 
    PostImagePresignedUrlRequest, 
    PostVideoPresignedUrlRequest, 
    PostImagePresignedUrlResponse, 
    PostVideoPresignedUrlResponse,
} from '@/api/types/postMedia';


export const postImagePresignedUrl = async (request: PostImagePresignedUrlRequest) => {
  const { data } = await apiClient.post<PostImagePresignedUrlResponse>('/post/presign-image-upload', request);
  return data;
};

export const postVideoPresignedUrl = async (request: PostVideoPresignedUrlRequest) => {
  const { data } = await apiClient.post<PostVideoPresignedUrlResponse>('/post/presign-upload', request);
  return data;
};