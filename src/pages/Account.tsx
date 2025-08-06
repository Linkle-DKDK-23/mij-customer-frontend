import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Edit, ChevronRight, Gift, FileText, DollarSign, CreditCard } from 'lucide-react';

interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  followingCount: number;
  followerCount: number;
  totalLikes: number;
}

const mockUser: UserProfile = {
  name: 'ピエール',
  username: '@piepie',
  avatar: 'https://picsum.photos/120/120?random=50',
  followingCount: 0,
  followerCount: 3,
  totalLikes: 0
};

export default function Account() {
  const [activeTab, setActiveTab] = useState('管理画面');
  
  const tabs = ['管理画面', '加入中', '単品購入', 'いいね'];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        {/* Profile Section */}
        <div className="p-6 text-center">
          <div className="mb-4">
            <h1 className="text-lg font-medium text-gray-900">{mockUser.name}</h1>
            <p className="text-gray-600 text-sm">{mockUser.username}</p>
            <div className="flex items-center justify-center mt-2">
              <button className="text-blue-500 text-sm flex items-center">
                プロフィールを見る
                <Edit className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          
          <div className="w-24 h-24 mx-auto mb-4">
            <img 
              src={mockUser.avatar} 
              alt={mockUser.name}
              className="w-full h-full rounded-full object-cover bg-gray-200"
            />
          </div>
          
          <div className="flex justify-center space-x-8 text-sm">
            <div className="text-center">
              <div className="text-gray-600">フォロー</div>
              <div className="font-medium">{mockUser.followingCount}人</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">フォロワー</div>
              <div className="font-medium">{mockUser.followerCount}人</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">総いいね</div>
              <div className="font-medium">{mockUser.totalLikes}件</div>
            </div>
          </div>
        </div>

        {/* Account Settings Link */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900">アカウント設定</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Management Content */}
        {activeTab === '管理画面' && (
          <div className="px-6 space-y-4">
            {/* Coupon Management */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">クーポン管理</h3>
                    <p className="text-sm text-gray-600">
                      保有クーポンの確認、クーポンの発行、管理、
                      <br />
                      利用状況を確認できます。
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Post Management */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-4">投稿管理</h3>
              <div className="grid grid-cols-5 gap-2 text-center text-sm">
                <div>
                  <div className="text-gray-600">審査中</div>
                  <div className="font-medium">1</div>
                </div>
                <div>
                  <div className="text-gray-600">要修正</div>
                  <div className="font-medium">0</div>
                </div>
                <div>
                  <div className="text-gray-600">非公開</div>
                  <div className="font-medium">1</div>
                </div>
                <div>
                  <div className="text-primary">公開済み</div>
                  <div className="font-medium text-primary">1</div>
                </div>
                <div>
                  <div className="text-gray-600">削除</div>
                  <div className="font-medium">0</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="text-pink-500 text-sm">すべて見る &gt;</button>
              </div>
            </div>

            {/* Sales */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">売上金</h3>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900">0円</div>
              </div>
              <div className="space-y-2">
                <button className="w-full text-pink-500 text-sm text-center">
                  売上金の詳細 &gt;
                </button>
                <button className="w-full text-pink-500 text-sm text-center">
                  出金申請 &gt;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content (placeholder) */}
        {activeTab !== '管理画面' && (
          <div className="px-6 py-8 text-center text-gray-500">
            {activeTab}のコンテンツ
          </div>
        )}
      </div>
    </div>
  );
}
