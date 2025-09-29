export interface Post {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  rank?: number;
}

export interface RecentPostsSectionProps {
  posts: Post[];
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  verified: boolean;
  rank?: number;
}

export interface CreatorsSectionProps {
  title: string;
  creators: Creator[];
  showRank?: boolean;
  onCreatorClick?: (creatorId: string) => void;
  showMoreButton?: boolean;
  scrollable?: boolean;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface RecommendedGenresSectionProps {
  genres: Genre[];
}

export interface BannerItem {
  id: string;
  image: string;
  title: string;
} 

export interface BannerCarouselSectionProps {
  bannerItems: BannerItem[];
}
