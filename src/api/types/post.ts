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