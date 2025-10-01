export interface TopPageData {
	genres: Array<{
		id: string;
		name: string;
		slug: string;
		post_count: number;
	}>;
	ranking_posts: Array<{
		id: string;
		description: string;
		thumbnail_url?: string;
		likes_count: number;
		creator_name: string;
		username: string;
		creator_avatar_url?: string;
		rank: number;
		duration: string;
	}>;
	top_creators: Array<{
		id: string;
		name: string;
		username: string;
		avatar_url?: string;
		followers_count: number;
		rank?: number;
	}>;
	new_creators: Array<{
		id: string;
		name: string;
		username: string;
		avatar_url?: string;
		followers_count: number;
	}>;
	recent_posts: Array<{
		id: string;
		description: string;
		thumbnail_url?: string;
		creator_name: string;
		username: string;
		creator_avatar_url?: string;
		duration?: string;
		likes_count?: number;
	}>;
}