export interface ProfilePost {
  id: string;
  title: string;
  thumbnail_storage_key?: string;
  video_duration?: number;
  created_at: string;
}

export interface ProfilePlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
}

export interface ProfilePurchase {
  id: string;
  amount: number;
  created_at: string;
  post?: ProfilePost;
}

export interface ProfileGacha {
  id: string;
  amount: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  slug: string;
  display_name?: string;
  avatar_url?: string;
  cover_url?: string;
  bio?: string;
  website_url?: string;
  post_count: number;
  follower_count: number;
  posts: ProfilePost[];
  plans: ProfilePlan[];
  individual_purchases: ProfilePurchase[];
  gacha_items: ProfileGacha[];
}
