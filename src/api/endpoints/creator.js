import apiClient from '@/api/axios';
export const registerCreator = async (creatorData) => {
    const response = await apiClient.post(`/creators/register`, creatorData);
    return response.data;
};
export const updateCreatorProfile = async (creatorData, userId) => {
    const response = await apiClient.put(`/creators/profile?user_id=${userId}`, creatorData);
    return response.data;
};
export const getCreatorProfile = async (userId) => {
    const response = await apiClient.get(`/creators/profile?user_id=${userId}`);
    return response.data;
};
export const submitIdentityVerification = async (verificationData) => {
    const response = await apiClient.post('/creators/identity-verification', verificationData);
    return response.data;
};
export const getVerificationStatus = async (userId) => {
    const response = await apiClient.get(`/creators/verification-status?user_id=${userId}`);
    return response.data;
};
export const uploadIdentityDocument = async (documentData) => {
    const response = await apiClient.post('/creators/identity-documents', documentData);
    return response.data;
};
