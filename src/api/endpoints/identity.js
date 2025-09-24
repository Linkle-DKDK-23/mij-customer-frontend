import apiClient from '@/api/axios';
/**
 * presigned URL を取得
 * @param request
 * @returns PresignUploadResponse
 */
export const identityPresignedUrl = async (request) => {
    const { data } = await apiClient.post('/identity/presign-upload', request);
    return data;
};
/**
 * KYCアップロード完了をサーバに通知
 * @param submission_id presignで受け取ったID
 * @param files kind/ext の配列
 */
export const completeIdentityUpload = async (verification_id, files) => {
    const { data } = await apiClient.post('/identity/complete', {
        verification_id,
        files,
    });
    return data;
};
