import apiClient from '@/api/axios';
import { PresignedUrlRequest, PresignUploadResponse, PresignedUploadItem, CompleteFile } from '@/api/types/identity';
import axios from 'axios';

// 1) サーバーから presigned PUT 発行
export const presignedUrl = async (request: PresignedUrlRequest) => {
  const { data } = await apiClient.post<PresignUploadResponse>('/identity/presign-upload', request);
  return data;
};

/**
 * S3 の presigned URL に対して PUT するユーティリティ
 * - CSRF不要のため apiClient ではなく素の axios を使用
 * - onProgress は 0-100 の整数パーセンテージ
 */
export async function putToPresignedUrl(
  item: PresignedUploadItem,
  file: File,
  headers: Record<string, string>,
  opts?: { onProgress?: (pct: number) => void }
): Promise<void> {
  const client = axios.create({ withCredentials: false, timeout: 60_000 });
  await client.put(item.upload_url, file, {
		headers: headers,
		onUploadProgress: (e) => {
			if (opts?.onProgress && e.total) opts.onProgress(Math.round((e.loaded * 100) / e.total));
		},
		validateStatus: () => true,
	}).then(res => {
		if (res.status < 200 || res.status >= 300) {
			const body = typeof res.data === 'string' ? res.data : (res.request?.responseText ?? '');
			throw new Error(`S3 PUT failed ${res.status}: ${body?.slice(0,500)}`);
		}
	});
}
/**
 * KYCアップロード完了をサーバに通知
 * @param submission_id presignで受け取ったID
 * @param files kind/ext の配列
 */
export const completeIdentityUpload = async (
  verification_id: string,
  files: CompleteFile[]
) => {
	console.log('completeIdentityUpload', files);
  const { data } = await apiClient.post('/identity/complete', {
    verification_id,
    files,
  });
  return data;
};