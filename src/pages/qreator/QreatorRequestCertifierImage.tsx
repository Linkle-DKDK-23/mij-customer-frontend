import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Camera, CheckCircle } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';

interface UploadedFile {
  id: string;
  name: string;
  type: 'id-front' | 'id-back' | 'selfie';
  uploaded: boolean;
}

export default function QreatorRequestCertifierImage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: '1', name: '身分証明書（表面）', type: 'id-front', uploaded: false },
    { id: '2', name: '身分証明書（裏面）', type: 'id-back', uploaded: false },
    { id: '3', name: '本人確認写真', type: 'selfie', uploaded: false }
  ]);

  const handleFileUpload = (fileType: string) => {
    setUploadedFiles(prev =>
      prev.map(file =>
        file.type === fileType ? { ...file, uploaded: true } : file
      )
    );
    console.log(`File uploaded for: ${fileType}`);
  };

  const handleSubmit = () => {
    const allUploaded = uploadedFiles.every(file => file.uploaded);
    if (!allUploaded) {
      alert('すべての書類をアップロードしてください');
      return;
    }
    console.log('Identity verification submitted');
  };

  const allFilesUploaded = uploadedFiles.every(file => file.uploaded);

  return (
    <AuthLayout>
      <div className="space-y-6">

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            身分証明書のアップロード
          </h2>
          <p className="text-sm text-gray-600">
            本人確認のため、以下の書類をアップロードしてください
          </p>
        </div>

        <div className="space-y-4">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                file.uploaded
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:border-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                {file.uploaded ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : file.type === 'selfie' ? (
                  <Camera className="h-8 w-8 text-gray-400" />
                ) : (
                  <FileText className="h-8 w-8 text-gray-400" />
                )}
                <h3 className="text-sm font-medium text-gray-900">
                  {file.name}
                </h3>
                {file.uploaded ? (
                  <p className="text-xs text-green-600">アップロード完了</p>
                ) : (
                  <Button
                    onClick={() => handleFileUpload(file.type)}
                    variant="outline"
                    className="mt-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    ファイルを選択
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">アップロード時の注意事項</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• 画像は鮮明で文字が読み取れるものをご用意ください</li>
            <li>• ファイル形式：JPEG、PNG（最大5MB）</li>
            <li>• 身分証明書は有効期限内のものをご使用ください</li>
            <li>• 本人確認写真は身分証明書と同じ人物であることを確認できるもの</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">対応可能な身分証明書</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 運転免許証</li>
            <li>• パスポート</li>
            <li>• マイナンバーカード</li>
            <li>• 住民基本台帳カード</li>
          </ul>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!allFilesUploaded}
          className="w-full bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300"
        >
          確認書類を提出する
        </Button>
      </div>
    </AuthLayout>
  );
}
