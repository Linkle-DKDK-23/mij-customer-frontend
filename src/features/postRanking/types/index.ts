export interface Post {
  id: string;
  description: string;
  thumbnail_url: string;
  likes_count: number;
  creator_name: string;
  username: string;
  creator_avatar_url: string;
  rank: number;
}

export interface RankingSection {
  id: string;
  title: string;
  posts: Post[];
}

export interface TabItem {
  id: string;
  label: string;
  isActive: boolean;
}

export interface RankingPostsAllTimeResponse {
  id: string;
  description: string;
  thumbnail_url: string;
  likes_count: number;
  creator_name: string;
  username: string;
  creator_avatar_url: string;
  rank: number;
}

export interface RankingPostsDailyResponse {
  id: string;
  description: string;
  thumbnail_url: string;
  likes_count: number;
  creator_name: string;
  username: string;
  creator_avatar_url: string;
  rank: number;
}

export interface RankingPostsMonthlyResponse {
  id: string;
  description: string;
  thumbnail_url: string;
  likes_count: number;
  creator_name: string;
  username: string;
  creator_avatar_url: string;
  rank: number;
}

export interface RankingPostsWeeklyResponse {
  id: string;
  description: string;
  thumbnail_url: string;
  likes_count: number;
  creator_name: string;
  username: string;
  creator_avatar_url: string;
  rank: number;
}

export interface RankingResponse {
  all_time: RankingPostsAllTimeResponse[];
  monthly: RankingPostsMonthlyResponse[];
  weekly: RankingPostsWeeklyResponse[];
  daily: RankingPostsDailyResponse[];
}
