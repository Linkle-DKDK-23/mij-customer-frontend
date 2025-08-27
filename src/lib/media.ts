// 画像用拡張子取得関数
export const mimeToImageExt = (mime: string): "jpg" | "jpeg" | "png" | "pdf" => {
	if (mime === "image/jpeg") return "jpg";
	if (mime === "image/png") return "png";
	if (mime === "application/pdf") return "pdf";
	return "jpg";
};

export const mimeToExt = (mime: string): string => {
  if (mime === "video/mp4") return "mp4";
  if (mime === "video/avi") return "avi";
  if (mime === "video/mov") return "mov";
  if (mime === "video/wmv") return "wmv";
  if (mime === "video/MOV") return "MOV";
  return "mp4";
};


