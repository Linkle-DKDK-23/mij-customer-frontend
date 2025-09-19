export interface CreatePostRequest {
	description: string;
	category_ids: string[];
	tags?: string;
	scheduled: boolean;
	formattedScheduledDateTime?: Date;
	expiration: boolean;
	expirationDate?: Date;
	plan: boolean;
	plan_ids?: string[];
	single: boolean;
  price?: number;
	post_type: 'video' | 'image';
}

export interface PostDetailData {
	created_at: string;
	creator: {
		name: string;
		slug: string;
		avatar: string;
		verified: boolean;
	};
	description: string;
	main_video_duration: string;
	sample_video_duration: string;
	id: string;
	likes: number;
	thumbnail: string;
	title: string;
	updated_at: string;
	video_url: string;
	views: number;
	categories: {
		id: string;
		name: string;
		slug: string;
	}[];
	media_assets: {
		[key: string]: {
			kind: string;
			storage_key: string;
		};
	};
	subscription: {
		amount: number;
		currency: string;
		interval: string | null;
		plan_name: string;
		plan_description: string;
	};
	single: {
		amount: number;
		currency: string;
	};
}