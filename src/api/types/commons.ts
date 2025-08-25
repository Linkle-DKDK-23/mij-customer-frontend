export interface FileSpec {
	content_type: "image/jpeg" | "image/png" | "application/pdf";
	ext: "jpg" | "jpeg" | "png" | "pdf";
}

export interface VideoFileSpec {
	content_type: "video/mp4" | "video/avi" | "video/mov" | "video/wmv" | "video/MOV" | "video/MP4" | "video/AVI" | "video/MOV" | "video/WMV" | "video/mp4" | "video/avi" | "video/mov" | "video/wmv" | "video/MOV" | "video/MP4" | "video/AVI" | "video/MOV" | "video/WMV";
	ext: "mp4" | "avi" | "mov" | "wmv" | "MOV" | "MP4" | "AVI" | "MOV" | "WMV";
}