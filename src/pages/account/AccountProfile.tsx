import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share, MessageCircle, Crown, Star, Link as LinkIcon } from 'lucide-react';
import AccountLayout from '@/components/account/AccountLayout';
import AccountNavigation from '@/components/account/AccountNavigation';

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  duration: string;
  date: string;
  isVideo?: boolean;
}

interface Plan {
  id: string;
  title: string;
  description: string;
  thumbnails: string[];
  postCount: number;
  monthlyPrice: number;
  isRecommended?: boolean;
  isFree?: boolean;
}

interface GachaItem {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  remaining: number;
  total: number;
}

interface IndividualPurchase {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  duration?: string;
  date: string;
}

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  postCount: number;
  followerCount: number;
  websiteUrl?: string;
  isFollowing: boolean;
  backgroundImage: string;
}

const mockCreator: Creator = {
  id: '1',
  name: 'ピエール',
  username: '@piepie',
  avatar: 'https://picsum.photos/200/200?random=60',
  bio: 'プロフィール説明文がここに入ります。',
  postCount: 1,
  followerCount: 3,
  websiteUrl: 'https://example.com',
  isFollowing: false,
  backgroundImage: 'https://picsum.photos/200/200?random=61'
};

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'サンプル投稿',
    thumbnail: 'https://picsum.photos/300/200?random=70',
    price: 1000,
    duration: '05:30',
    date: '2025/08/01 12:00',
    isVideo: true
  }
];

const mockPlans: Plan[] = [
  {
    id: '1',
    title: 'ベーシックプラン',
    description: '基本プラン',
    thumbnails: ['https://picsum.photos/150/100?random=80'],
    postCount: 5,
    monthlyPrice: 1000
  }
];

const mockGachaItems: GachaItem[] = [
  {
    id: '1',
    title: 'サンプルガチャ',
    thumbnail: 'https://picsum.photos/200/150?random=90',
    price: 500,
    remaining: 5,
    total: 10
  }
];

const mockIndividualPurchases: IndividualPurchase[] = [
  {
    id: '1',
    title: '単品コンテンツ',
    thumbnail: 'https://picsum.photos/300/200?random=100',
    price: 800,
    date: '2025/08/01'
  }
];

export default function AccountProfile() {
  const [activeTab, setActiveTab] = useState<'posts' | 'plans' | 'individual' | 'gacha'>('posts');

  const navigationItems = [
    { id: 'posts', label: '投稿', count: mockPosts.length, isActive: activeTab === 'posts' },
    { id: 'plans', label: 'プラン', count: mockPlans.length, isActive: activeTab === 'plans' },
    { id: 'individual', label: '単品購入', count: mockIndividualPurchases.length, isActive: activeTab === 'individual' },
    { id: 'gacha', label: 'ガチャ', count: mockGachaItems.length, isActive: activeTab === 'gacha' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as 'posts' | 'plans' | 'individual' | 'gacha');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative">
                  <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover" />
                  {post.isVideo && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {post.duration}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded">
                    ¥{post.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">{post.date}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</h3>
                </div>
              </div>
            ))}
          </div>
        );
      case 'plans':
        return (
          <div className="p-6 space-y-4">
            {mockPlans.map((plan) => (
              <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <img src={plan.thumbnails[0]} alt={plan.title} className="w-20 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{plan.title}</h3>
                    <p className="text-sm text-gray-600">投稿数 {plan.postCount}</p>
                    <p className="text-sm font-medium text-primary">月額料金 ¥{plan.monthlyPrice.toLocaleString()}/月</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">加入</Button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'individual':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {mockIndividualPurchases.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded">
                    ¥{item.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        );
      case 'gacha':
        return (
          <div className="p-6 space-y-4">
            {mockGachaItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img src={item.thumbnail} alt={item.title} className="w-20 h-16 object-cover rounded" />
                    <Star className="absolute top-1 left-1 h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm font-medium text-primary">¥{item.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-600">残り {item.remaining} /{item.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <div className="absolute -bottom-8 left-6">
            <img 
              src={mockCreator.avatar} 
              alt={mockCreator.name}
              className="w-16 h-16 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button variant="ghost" size="sm" className="bg-white/20 text-white hover:bg-white/30">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-white/20 text-white hover:bg-white/30">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="px-6 pt-10 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{mockCreator.name}</h1>
              <p className="text-gray-600">{mockCreator.username}</p>
              <p className="text-gray-700 mt-2">{mockCreator.bio}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span>{mockCreator.postCount}投稿</span>
                <span>{mockCreator.followerCount}フォロワー</span>
              </div>
              {mockCreator.websiteUrl && (
                <a href={mockCreator.websiteUrl} className="flex items-center space-x-1 text-primary text-sm mt-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>{mockCreator.websiteUrl}</span>
                </a>
              )}
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              {mockCreator.isFollowing ? 'フォロー中' : 'フォロー'}
            </Button>
          </div>
        </div>

        <AccountNavigation items={navigationItems} onItemClick={handleTabClick} />

        {renderContent()}
      </div>
    </AccountLayout>
  );
}
