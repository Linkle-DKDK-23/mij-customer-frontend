import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Camera } from 'lucide-react';
import AccountHeader from '@/components/account/AccountHeader';
import { updateAccountInfo, getAccountInfo } from '@/api/endpoints/account';
import { AccountInfo } from '@/api/types/account';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProfileData, AccountUploadedFile, AccountPresignedUrlRequest } from '@/api/types/account';
import { FileSpec } from '@/api/types/commons';
import { AccountFileKind } from '@/constants/constants';
import { accountPresignedUrl } from '@/api/endpoints/account';
import { putToPresignedUrl } from '@/service/s3FileUpload';
import { useNavigate } from 'react-router-dom';


const mimeToExt = (mime: string): FileSpec['ext'] => {
  if (mime === "image/png") return "png";
  if (mime === "application/pdf") return "pdf";
  return "jpg" as FileSpec['ext'];
};


export default function AccountEdit() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<ProfileData>({
    coverImage: 'https://picsum.photos/600/200?random=110',
    avatar: '/src/assets/no-image.svg',
    name: '',
    id: '',
    description: '',
    links: {
      website: '',
    }
  });

  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<AccountUploadedFile[]>([
    { id: '1', name: 'カバー画像', type: 'cover', uploaded: false },
    { id: '2', name: 'アバター画像', type: 'avatar', uploaded: false }
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [files, setFiles] = useState<Record<AccountFileKind, File | null>>({
    'cover': null,
    'avatar': null
  });

  const [progress, setProgress] = useState<Record<AccountFileKind, number>>({
    'cover': 0, 
    'avatar': 0
  });

  const inputRefs = {
    'cover': useRef<HTMLInputElement>(null),
    'avatar':  useRef<HTMLInputElement>(null),
  };

  const allFilesPicked = useMemo(
    () => (['cover','avatar'] as const).every(k => !!files[k]),
    [files]
  );

  const openPicker = (kind: AccountFileKind) => inputRefs[kind].current?.click();

  const onPick = (kind: AccountFileKind) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setMessage(null);
    if (!f) return;

    const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowed.includes(f.type)) {
      setMessage('ファイル形式は JPEG/PNG/PDF のみです');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setMessage('ファイルサイズは 10MB 以下にしてください');
      return;
    }

    setFiles(prev => ({ ...prev, [kind]: f }));
    setUploadedFiles(prev => prev.map(item =>
      item.type === kind ? { ...item, uploaded: false } : item
    ));
    setProgress(p => ({ ...p, [kind]: 0 }));
  };

  const handleSave = async () => {
    setMessage(null);
    if (!allFilesPicked) {
      setMessage('すべての画像を選択してください');
      return;
    }

    setSubmitting(true);
    const AccountFileKinds = ['cover','avatar'] as const;

    const presignedUrlRequest: AccountPresignedUrlRequest = {
      files: AccountFileKinds.map((k) => {
        const file = files[k]!;
        return {
          kind: k,
          content_type: file.type as FileSpec['content_type'],
          ext: mimeToExt(file.type),
        };
      })
    };

    try {
      // 1) presign
      const presignRes = await accountPresignedUrl(presignedUrlRequest);

      const uploadOne = async (kind: AccountFileKind) => {
        const file = files[kind]!;
        const item = presignRes.uploads[kind]; 
        const header = item.required_headers;

        await putToPresignedUrl(item, file, header, {
          onProgress: (pct) => setProgress((p) => ({ ...p, [kind]: pct })),
        });
        setUploadedFiles((prev) =>
          prev.map((it) => (it.type === kind ? { ...it, uploaded: true } : it))
        );
      };

      await uploadOne('cover');
      await uploadOne('avatar');

      const res = await updateAccountInfo({
        name: profileData.name,
        display_name: profileData.id.replace('@', ''),
        description: profileData.description,
        links: profileData.links,
        avatar_url: presignRes.uploads['avatar'].key,
        cover_url: presignRes.uploads['cover'].key
      });

      if (res.success) {
        setMessage('アカウント情報が正常に更新されました');
        navigate('/account');
      } else {
        setMessage('アカウント情報の更新に失敗しました');
      }
      return;
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 400 || status === 403) {
        setMessage('URLの有効期限切れかヘッダ不一致です。もう一度やり直してください。');
      } else {
        setMessage('アップロードに失敗しました。時間をおいて再試行してください。');
      }
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await getAccountInfo();
        setAccountInfo(data);
        setProfileData(prev => ({
          ...prev,
          name: data.slug,
          id: data.display_name,
          avatar: data.avatar_url || '/src/assets/no-image.svg'
        }));
      } catch (error) {
        console.error('Failed to fetch account info:', error);
      }
    };

    fetchAccountInfo();
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
     <div className="bg-white">
      <AccountHeader title="プロフィールを編集" showBackButton />
      
      <div className="p-6 space-y-6">
        <div className="flex justify-end space-x-3">
          <Button variant="outline">キャンセル</Button>
          <Button 
            className="bg-primary hover:bg-primary/90" 
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? '保存中...' : '保存'}
          </Button>
        </div>

        {message && (
          <div className={`p-3 rounded-md text-sm ${
            message.includes('正常') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          {uploadedFiles.map((file) => (
            <div key={file.id}>
              <Label className="block text-sm font-medium text-gray-700 mb-3">{file.name}</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  file.uploaded ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {file.uploaded ? (
                    <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">✓</span>
                    </div>
                  ) : file.type === 'avatar' ? (
                    <Camera className="h-12 w-12 text-gray-400" />
                  ) : (
                    <Upload className="h-12 w-12 text-gray-400" />
                  )}

                  <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>

                  <input
                    ref={inputRefs[file.type]}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={onPick(file.type)}
                  />

                  {!file.uploaded && (
                    <Button
                      onClick={() => openPicker(file.type)}
                      variant="outline"
                      className="mt-2"
                      disabled={submitting}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      ファイルを選択
                    </Button>
                  )}

                  {/* 進捗バー */}
                  <div className="w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden">
                    <div
                      className="h-2 bg-primary transition-all"
                      style={{ width: `${progress[file.type]}%` }}
                    />
                  </div>

                  {/* 選択済みファイル名表示 */}
                  {files[file.type] && !file.uploaded && (
                    <p className="text-xs text-gray-500 mt-1">
                      {files[file.type]!.name}（{Math.round(files[file.type]!.size / 1024)} KB）
                    </p>
                  )}

                  {file.uploaded && <p className="text-xs text-green-600">アップロード完了</p>}
                </div>
              </div>
            </div>
          ))}

          <div className="text-sm text-gray-500">
            著作権を侵害する恐れのあるカバー画像とアバター画像は審査対象です。<br />
            詳細は利用規約・ガイドライン一覧をご確認ください。
          </div>

          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">名前</Label>
            <Input
              type="text"
              id="name"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="名前を入力してください"
            />
          </div>

          <div>
            <Label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">ID</Label>
            <Input
              type="text"
              id="id"
              value={profileData.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">説明文</Label>
            <Textarea
              id="description"
              value={profileData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="プロフィールについて入力してください"
            />
          </div>

          <div>
            <Label htmlFor="links" className="block text-sm font-medium text-gray-700 mb-2">リンク</Label>
            <Input
              type="url"
              id="links"
              value={profileData.links.website}
              onChange={(e) => handleInputChange('links', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
