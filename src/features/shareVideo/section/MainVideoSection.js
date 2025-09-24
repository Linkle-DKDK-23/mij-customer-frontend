import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import ThumbnailPreview from "@/features/shareVideo/componets/ThumbnailPreview";
import MainStreemUploadArea from "@/components/common/MainStreemUploadArea";
export default function MainVideoSection({ selectedMainFile, previewMainUrl, thumbnail, uploading, uploadProgress, uploadMessage, onFileChange, onThumbnailChange, onRemove, onUpload, }) {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-full", children: previewMainUrl && (_jsx("video", { src: previewMainUrl, controls: true, className: "w-full rounded-md shadow-md" })) }), _jsx("div", { className: "flex items-center space-x-4 p-5", children: selectedMainFile ? (thumbnail && (_jsx(ThumbnailPreview, { thumbnail: thumbnail, onRemove: onRemove, onChange: onThumbnailChange }))) : (_jsx(MainStreemUploadArea, { onFileChange: onFileChange })) }), selectedMainFile && onUpload && (_jsxs("div", { className: "space-y-4 p-5 border-t border-primary pt-5", children: [_jsx(Button, { onClick: onUpload, disabled: uploading, className: "w-full bg-primary hover:bg-primary/90 text-white", children: uploading ? 'アップロード中...' : '動画をアップロード' }), uploading && (_jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: _jsx("div", { className: "bg-primary h-2.5 rounded-full transition-all duration-300", style: { width: `${uploadProgress.main || 0}%` } }) })), uploadMessage && (_jsx("div", { className: `p-3 rounded-md text-sm ${uploadMessage.includes('完了')
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-green-200'}`, children: uploadMessage }))] }))] }));
}
