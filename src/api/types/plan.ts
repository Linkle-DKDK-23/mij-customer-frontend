export interface Plan {
	id: string;
	title: string;
	description: string;
	thumbnails: string[];
	postCount: number;
	monthlyPrice: number;
	isRecommended?: boolean;
	isFree?: boolean;
}