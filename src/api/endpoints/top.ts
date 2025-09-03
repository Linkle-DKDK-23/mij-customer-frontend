import apiClient from '@/api/axios';

export interface TopPageData {
  genres: Array<{
    id: string;
    name: string;
    post_count: number;
  }>;
  ranking_posts: Array<{
    id: string;
    description: string;
    thumbnail_url?: string;
    likes_count: number;
    creator_name: string;
    creator_avatar_url?: string;
    rank: number;
  }>;
  top_creators: Array<{
    id: string;
    name: string;
    avatar_url?: string;
    followers_count: number;
    rank?: number;
  }>;
  new_creators: Array<{
    id: string;
    name: string;
    avatar_url?: string;
    followers_count: number;
  }>;
  recent_posts: Array<{
    id: string;
    description: string;
    thumbnail_url?: string;
    creator_name: string;
    creator_avatar_url?: string;
  }>;
}

export const getTopPageData = (): Promise<TopPageData> => {
  return apiClient.get('/top/').then(response => response.data);
};
