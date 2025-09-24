import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
export const VideoThumbnail = ({ videoFile, onThumbnailChange }) => {
    const [autoThumbnail, setAutoThumbnail] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const fileInputRef = useRef(null);
    // ▶️ 動画から自動でサムネイル生成
    useEffect(() => {
        if (!videoFile)
            return;
        const video = document.createElement("video");
        video.src = URL.createObjectURL(videoFile);
        video.currentTime = 1;
        video.muted = true;
        video.playsInline = true;
        video.addEventListener("loadeddata", () => {
            const canvas = document.createElement("canvas");
            canvas.width = 320;
            canvas.height = 180;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailUrl = canvas.toDataURL("image/jpeg");
            setAutoThumbnail(thumbnailUrl);
            setSelectedThumbnail(thumbnailUrl);
            onThumbnailChange?.(thumbnailUrl);
        });
        return () => {
            video.remove();
        };
    }, [videoFile]);
    // 🖼 手動サムネイル選択
    const handleManualThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setSelectedThumbnail(result);
            onThumbnailChange?.(result);
        };
        reader.readAsDataURL(file);
    };
    // 📸 サムネイル画像クリックで選択可能に
    const handleThumbnailClick = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { onClick: handleThumbnailClick, className: "w-24 h-24 border-2 border-primary rounded-md overflow-hidden cursor-pointer", children: selectedThumbnail ? (_jsx("img", { src: selectedThumbnail, alt: "thumbnail", className: "w-full h-full object-cover" })) : (_jsx("div", { className: "flex items-center justify-center w-full h-full text-xs text-muted", children: "No Thumbnail" })) }), _jsx("input", { type: "file", accept: "image/*", ref: fileInputRef, onChange: handleManualThumbnail, className: "hidden" })] }));
};
export default VideoThumbnail;
