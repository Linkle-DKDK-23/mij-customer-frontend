export type FileKind = "front" | "back" | "selfie";

export interface UploadedFile {
  id: string;
  name: string;
  type: FileKind;
  uploaded: boolean;
}

export interface QreatorRequestCertifierImageProps {
  onNext?: () => void;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  steps?: Array<{
    id: number;
    title: string;
    completed: boolean;
    current: boolean;
  }>;
}

/** 🔧 ファイルごとに content_type / ext を持たせる */
export interface PresignedUrlFileSpec {
  kind: FileKind;
  content_type: "image/jpeg" | "image/png" | "application/pdf";
  ext: "jpg" | "jpeg" | "png" | "pdf";
}

export interface PresignedUrlRequest {
  files: PresignedUrlFileSpec[];
}

/** 受け取り型（便利なので定義しておく） */
export interface PresignUploadResponse {
  verification_id: string;
  uploads: {
    [K in FileKind]: {
      key: string;
      upload_url: string;
      required_headers: Record<string, string>;
      expires_in: number;
    };
  };
	headers: Record<string, string>;
}


/** presign結果の1件分（required_headers をそのまま送る前提） */
export type PresignedUploadItem = {
  upload_url: string;
  required_headers: Record<string, string>;
  expires_in: number;
  key: string;
};


export interface CompleteFile {
  kind: FileKind;
  ext: "jpg" | "jpeg" | "png" | "pdf";
}