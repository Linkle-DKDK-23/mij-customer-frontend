import React, { useState, useCallback } from 'react';
import { presignedUrl } from '@/api/endpoints/video';
import { PresignedUrlResponse } from '@/api/types/video';
import { uploadToS3 } from '@/utils/uploadToS3';
import { Button } from "@/components/ui/button";

// セクションコンポーネントをインポート
import FileUploadSection from '@/feateure/upload/section/FileUploadSection';
import ProgressSection from '@/feateure/upload/section/ProgressSection';
import VideoPlayerSection from '@/feateure/upload/section/VideoPlayerSection';

export default function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userId, setUserId] = useState<string>("1");
  const [videoId, setVideoId] = useState<string>("IMG_0275");

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setVideoUrl(null); // reset preview on new selection
  };

  const handleUpload = async () => {
    console.log('uploading', selectedFile);
    if (!selectedFile) return;
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
    } catch (error) {
      console.error('アップロードエラー', error);
      alert('アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>動画アップロード</h2>

      {/* File Upload Section */}
      <FileUploadSection 
        selectedFile={selectedFile}
        onFileSelect={handleFileSelect}
      />
        
      <div className="p-6 space-y-4">
        {/* Progress Section */}
        <ProgressSection 
          uploading={uploading}
          progress={uploadProgress}
        />
      </div>

      {/* Video Player Section */}
      <VideoPlayerSection 
        videoId={videoId}
        userId={userId}
      />
    </div>
  );
}

