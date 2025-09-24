import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { presignedUrl } from '@/api/endpoints/video';
import { uploadToS3 } from '@/utils/uploadToS3';
// セクションコンポーネントをインポート
import FileUploadSection from '@/features/upload/section/FileUploadSection';
import ProgressSection from '@/features/upload/section/ProgressSection';
import VideoPlayerSection from '@/features/upload/section/VideoPlayerSection';
export default function VideoUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [userId, setUserId] = useState("1");
    const [videoId, setVideoId] = useState("IMG_0275");
    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setVideoUrl(null); // reset preview on new selection
    };
    const handleUpload = async () => {
        console.log('uploading', selectedFile);
        if (!selectedFile)
            return;
        setUploading(true);
        setUploadProgress(0);
        try {
            const response = await presignedUrl({
                filename: selectedFile.name,
                content_type: selectedFile.type,
            });
            await uploadToS3(selectedFile, response.upload_url, (percent) => {
                setUploadProgress(percent);
            });
            console.log('response', response);
            setVideoUrl(response.file_url);
            alert('アップロードが完了しました！');
        }
        catch (error) {
            console.error('アップロードエラー', error);
            alert('アップロードに失敗しました');
        }
        finally {
            setUploading(false);
        }
    };
    return (_jsxs("div", { style: { maxWidth: 600, margin: '0 auto', padding: 20 }, children: [_jsx("h2", { children: "\u52D5\u753B\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9" }), _jsx(FileUploadSection, { selectedFile: selectedFile, onFileSelect: handleFileSelect }), _jsx("div", { className: "p-6 space-y-4", children: _jsx(ProgressSection, { uploading: uploading, progress: uploadProgress }) }), _jsx(VideoPlayerSection, { videoId: videoId, userId: userId })] }));
}
