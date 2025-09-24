// 画像用拡張子取得関数
export const mimeToImageExt = (mime) => {
    if (mime === "image/jpeg")
        return "jpg";
    if (mime === "image/png")
        return "png";
    if (mime === "application/pdf")
        return "pdf";
    return "jpg";
};
export const mimeToExt = (mime) => {
    if (mime === "video/mp4")
        return "mp4";
    if (mime === "video/avi")
        return "avi";
    if (mime === "video/mov")
        return "mov";
    if (mime === "video/wmv")
        return "wmv";
    if (mime === "video/MOV")
        return "MOV";
    if (mime === "video/quicktime")
        return "mov";
    return "mp4";
};
