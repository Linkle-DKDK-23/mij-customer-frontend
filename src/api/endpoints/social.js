// src/api/endpoints/social.ts
import apiClient from "@/api/axios";
// フォロー関連API
export const toggleFollow = (userId) => apiClient.post(`/social/follow/${userId}`);
export const getFollowStatus = (userId) => apiClient.get(`/social/follow/status/${userId}`);
export const getFollowers = (userId, skip = 0, limit = 20) => apiClient.get(`/social/followers/${userId}?skip=${skip}&limit=${limit}`);
export const getFollowing = (userId, skip = 0, limit = 20) => apiClient.get(`/social/following/${userId}?skip=${skip}&limit=${limit}`);
// いいね関連API
export const toggleLike = (postId) => apiClient.post(`/social/like/${postId}`);
export const getLikeStatus = (postId) => apiClient.get(`/social/like/status/${postId}`);
export const getLikedPosts = (skip = 0, limit = 20) => apiClient.get(`/social/liked-posts?skip=${skip}&limit=${limit}`);
// コメント関連API
export const createComment = (postId, comment) => apiClient.post(`/social/comments/${postId}`, comment);
export const getComments = (postId, skip = 0, limit = 50) => apiClient.get(`/social/comments/${postId}?skip=${skip}&limit=${limit}`);
export const getCommentReplies = (parentCommentId, skip = 0, limit = 20) => apiClient.get(`/social/comments/${parentCommentId}/replies?skip=${skip}&limit=${limit}`);
export const updateComment = (commentId, comment) => apiClient.put(`/social/comments/${commentId}`, comment);
export const deleteComment = (commentId) => apiClient.delete(`/social/comments/${commentId}`);
// ブックマーク関連API
export const toggleBookmark = (postId) => apiClient.post(`/social/bookmark/${postId}`);
export const getBookmarkStatus = (postId) => apiClient.get(`/social/bookmark/status/${postId}`);
export const getBookmarks = (skip = 0, limit = 20) => apiClient.get(`/social/bookmarks?skip=${skip}&limit=${limit}`);
