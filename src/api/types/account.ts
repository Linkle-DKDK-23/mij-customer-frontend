import { AccountFileKind } from "@/constants/constants";
import { FileSpec } from "./commons";

export interface AccountInfo {
	slug?: string;
	display_name?: string;
	avatar_url?: string;
	cover_url?: string;
	followers_count: number;
	following_count: number;
	total_likes: number;
	pending_posts_count: number;
	rejected_posts_count: number;
	unpublished_posts_count: number;
	deleted_posts_count: number;
	approved_posts_count: number;
	total_sales: number;
	plan_count: number;
	total_plan_price: number;
}

export interface AccountUpdateRequest {
	name?: string;
	display_name?: string;
	description?: string;
	links?: Record<string, string>;
	avatar_url?: string;
	cover_url?: string;
}
  
export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  followingCount: number;
  followerCount: number;
  totalLikes: number;
}

export interface ProfileData {
	coverImage: string;
	avatar: string;
	name: string;
	id: string;
	description: string;
	links: Record<string, string>;
}

export interface AccountUploadedFile {
  id: string;
  name: string;
  type: AccountFileKind;
  uploaded: boolean;
}

export interface PresignedUrlFileSpec {
  kind: AccountFileKind;
  content_type: FileSpec['content_type'];
  ext: FileSpec['ext'];
}

export interface AccountPresignedUrlRequest {
  files: PresignedUrlFileSpec[];
}

export interface AccountPresignedUrlResponse {
  uploads: {
    [K in AccountFileKind]: {
      key: string;
      upload_url: string;
      required_headers: Record<string, string>;
      expires_in: number;
    };
  };
}

export interface AccountPostResponse {
    id: string
    description: string
    thumbnail_url: string | null
    likes_count: number
    creator_name: string
    display_name: string
    creator_avatar_url: string | null
	price: number | null
	currency: string | null
}

export interface AccountPostStatusResponse {
    pending_posts: AccountPostResponse[]
    rejected_posts: AccountPostResponse[]
    unpublished_posts: AccountPostResponse[]
    deleted_posts: AccountPostResponse[]
    approved_posts: AccountPostResponse[]
}
