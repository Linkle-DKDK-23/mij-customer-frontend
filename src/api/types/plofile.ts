import { AccountFileKind } from "@/constants/constants";
import { FileSpec } from "./commons";

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