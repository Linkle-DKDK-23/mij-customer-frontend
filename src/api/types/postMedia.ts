import { PostVideoFileKind, PostImageFileKind } from "@/constants/constants";
import { VideoFileSpec, FileSpec } from "./commons";

export interface PostVideoFileSpec {
	kind: PostVideoFileKind;
	content_type: VideoFileSpec['content_type'];
	ext: VideoFileSpec['ext'];
}

export interface PostImageFileSpec {
	kind: PostImageFileKind;
	content_type: FileSpec['content_type'];
	ext: FileSpec['ext'];
}

export interface PostVideoPresignedUrlRequest {
	files: PostVideoFileSpec[];
}

export interface PostImagePresignedUrlRequest {
	files: PostImageFileSpec[];
}

export interface PostImagePresignedUrlResponse {
	uploads: {
		[K in PostImageFileKind]: {
			key: string;
			upload_url: string;
			required_headers: Record<string, string>;
			expires_in: number;
		};
	}
}

export interface PostVideoPresignedUrlResponse {
	uploads: {
		[K in PostVideoFileKind]: {
			key: string;
			upload_url: string;
			required_headers: Record<string, string>;
			expires_in: number;
		};
	}
}

export interface Post {
	id: string;
	title: string;
	thumbnail: string;
	price: number;
	duration: string;
	date: string;
	isVideo?: boolean;
}

// 型定義
export interface PostData {
  title: string;
  description: string;
  genres: string[];
  tags: string;
  scheduled: boolean;
  scheduledDate?: Date;
  scheduledTime?: string;
  expiration: boolean;
  expirationDate?: Date;
  plan: boolean;
  planDate?: string;
  single: boolean;
  singleDate?: string;
  mainVideo: File | null;
  sampleVideo: File | null;
  ogpImage: string | null;
  thumbnail: string | null;
}