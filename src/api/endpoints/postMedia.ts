import apiClient from '@/api/axios';
import { 
    PostImagePresignedUrlRequest, 
    PostVideoPresignedUrlRequest, 
    PostImagePresignedUrlResponse, 
    PostVideoPresignedUrlResponse,
    PostMediaConvertRequest,
    PostMediaConvertResponse,
} from '@/api/types/postMedia';


export const postImagePresignedUrl = async (request: PostImagePresignedUrlRequest) => {
  const { data } = await apiClient.post<PostImagePresignedUrlResponse>('/media-assets/presign-image-upload', request);
  return data;
};

export const postVideoPresignedUrl = async (request: PostVideoPresignedUrlRequest) => {
  const { data } = await apiClient.post<PostVideoPresignedUrlResponse>('/media-assets/presign-video-upload', request);
  return data;
};


export const postMediaConvert = async (request: PostMediaConvertRequest) => {
  const { data } = await apiClient.post<PostMediaConvertResponse>('/transcodes/transcode_mc', request);
  return data;
};