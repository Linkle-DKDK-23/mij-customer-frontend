import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Camera } from 'lucide-react';
import AccountLayout from '@/components/account/AccountLayout';
import AccountHeader from '@/components/account/AccountHeader';

interface ProfileData {
  coverImage: string;
  avatar: string;
  name: string;
  id: string;
  description: string;
  links: string;
}

const mockProfileData: ProfileData = {
  coverImage: 'https://picsum.photos/600/200?random=110',
  avatar: 'https://picsum.photos/200/200?random=111',
  name: 'ピエール',
  id: '@piepie',
  description: 'プロフィール説明文がここに入ります。',
  links: 'https://example.com'
};

export default function AccountEdit() {
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AccountLayout>
      <AccountHeader title="プロフィールを編集" showBackButton />
      
      <div className="p-6 space-y-6">
        <div className="flex justify-end space-x-3">
          <Button variant="outline">キャンセル</Button>
          <Button className="bg-primary hover:bg-primary/90">保存</Button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">カバー画像をアップロード</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-blue-500 font-medium">ファイルを選択</p>
                <p className="text-sm text-gray-500 mt-1">カバー画像とアバター画像は審査対象です。</p>
                <p className="text-sm text-gray-500">審査完了するまでは反映されませんのでご了承ください。</p>
                <p className="text-sm text-red-500 mt-2">
                  著作権を侵害する恐れのある画像、公序良俗に反するガイドラインに反している画像等は
                  アップロードしないでください。詳細は利用規約・ガイドライン一覧をご確認ください。
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">アバター画像をアップロード</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <div className="flex flex-col items-center">
                <Camera className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-blue-500 font-medium">ファイルを選択</p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">名前</label>
            <input
              type="text"
              id="name"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="名前を入力してください"
            />
          </div>

          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">ID</label>
            <input
              type="text"
              id="id"
              value={profileData.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100"
              placeholder="@username"
              disabled
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">説明文</label>
            <textarea
              id="description"
              value={profileData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="プロフィールについて入力してください"
            />
          </div>

          <div>
            <label htmlFor="links" className="block text-sm font-medium text-gray-700 mb-2">リンク</label>
            <input
              type="url"
              id="links"
              value={profileData.links}
              onChange={(e) => handleInputChange('links', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
