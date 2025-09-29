export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  followingCount: number;
  followerCount: number;
  totalLikes: number;
}

export interface AccountInfo {
  profile_name?: string;
  username?: string;
  avatar_url?: string;
  following_count?: number;
  followers_count?: number;
  total_likes?: number;
  pending_posts_count?: number;
  rejected_posts_count?: number;
  unpublished_posts_count?: number;
  approved_posts_count?: number;
  deleted_posts_count?: number;
  total_sales?: number;
  plan_count?: number;
  total_plan_price?: number;
}

export interface AccountHeaderProps {
  title: string;
  showBackButton?: boolean;
  showActions?: boolean;
}

export interface AccountLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  count?: number;
  isActive?: boolean;
}

export interface AccountNavigationProps {
  items: NavigationItem[];
  onItemClick: (id: string) => void;
}