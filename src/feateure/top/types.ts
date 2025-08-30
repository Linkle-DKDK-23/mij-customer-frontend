export interface Post {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rank?: number;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  verified: boolean;
  rank?: number;
}

export interface Genre {
  id: string;
  name: string;
  postCount: number;
}

export interface BannerItem {
  id: string;
  image: string;
  title: string;
} 