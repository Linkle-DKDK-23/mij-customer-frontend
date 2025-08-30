export interface Post {
	id: string;
	title: string;
	thumbnail_storage_key?: string;
	video_duration?: number;
	created_at: string;
}

export interface Plan {
	id: string;
	name: string;
	description?: string;
	price: number;
}

export interface IndividualPurchase {
	id: string;
	amount: number;
	created_at: string;
	post?: {
		title: string;
		thumbnail_storage_key?: string;
	};
}

export interface GachaItem {
	id: string;
	amount: number;
	created_at: string;
}

export interface ContentSectionProps {
  activeTab: 'posts' | 'plans' | 'individual' | 'gacha';
  posts: Post[];
  plans: Plan[];
  individualPurchases: IndividualPurchase[];
  gachaItems: GachaItem[];
}

export interface AccountInfo {
	plan_count?: number;
	total_plan_price?: number;
}

export interface PlanManagementSectionProps {
	accountInfo: AccountInfo;
}

export interface PostManagementAccountInfo {
	pending_posts_count?: number;
	rejected_posts_count?: number;
	unpublished_posts_count?: number;
	approved_posts_count?: number;
	deleted_posts_count?: number;
}

export interface PostManagementSectionProps {
	accountInfo: PostManagementAccountInfo;
}

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  followingCount: number;
  followerCount: number;
  totalLikes: number;
}

export interface ProfileSectionProps {
  user: UserProfile;
}

export interface SalesAccountInfo {
  total_sales?: number;
}

export interface SalesSectionProps {
	accountInfo: SalesAccountInfo;
}