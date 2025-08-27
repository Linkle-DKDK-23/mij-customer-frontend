import React, { useState, useEffect, useCallback } from 'react';
import { presignedUrl } from '@/api/endpoints/video';
import { useDropzone } from 'react-dropzone';
import { PresignedUrlResponse } from '@/api/types/video';
import { uploadToS3 } from '@/utils/uploadToS3';
import { VideoPlayer } from '@/feateure/shareVideo/componets/videoPlayer';
import { Button } from "@/components/ui/button";

export default function VideoUpload() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userId, setUserId] = useState<string>("1");
  const [videoId, setVideoId] = useState<string>("IMG_0275");
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setVideoUrl(null); // reset preview on new selection
    }
  }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
    multiple: false,
    maxSize: 500 * 1024 * 1024, // 500MB
  });

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

      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '10px',
          padding: '30px',
          textAlign: 'center',
          backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <p>{selectedFile.name}（{(selectedFile.size / 1024 / 1024).toFixed(2)}MB）</p>
        ) : (
          <p>ここに動画ファイルをドロップ、またはクリックして選択</p>
        )}
      </div>
        
      <div className="p-6 space-y-4">
    </div>
      {uploading && (
        <div style={{ width: '100%', backgroundColor: '#eee', marginTop: '10px' }}>
          <div
            style={{
              width: `${uploadProgress}%`,
              backgroundColor: '#4caf50',
              height: '10px',
              transition: 'width 0.3s',
            }}
          />
        </div>
      )}

      {/* {videoUrl && ( */}
        <div style={{ marginTop: 30 }}>
          <h4>アップロード完了動画:</h4>
          <VideoPlayer videoId={videoId} userId={userId} />
        </div>
      {/* )} */}
    </div>
  );
}

