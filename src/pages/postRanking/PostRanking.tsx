import React, { useState } from 'react';
import { ChevronRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/custome/BottomNavigation';
import Header from '@/components/custome/Header';
import RankingCard from '@/components/video/RankingCard';
import FilterTabs from '@/components/video/FilterTabs';

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rank?: number;
  bookmarks?: number;
}

const mockRankingPosts: Post[] = [
  {
    id: '1',
    title: '【3日間限定】プレゼント企画 ♡ 内容は見てのお楽しみ',
    thumbnail: 'https://picsum.photos/400/300?random=111',
    duration: '1:16:50',
    views: 45200,
    likes: 2340,
    bookmarks: 575,
    creator: {
      name: 'CANPAS SELECTION',
      avatar: 'https://picsum.photos/100/100?random=211',
      verified: true
    },
    rank: 1
  },
  {
    id: '2',
    title: '男友の家に泊まって朝から晩まで プレゼント企画 ♡ 3日間限定',
    thumbnail: 'https://picsum.photos/400/300?random=112',
    duration: '2:37:09',
    views: 38900,
    likes: 1890,
    bookmarks: 254,
    creator: {
      name: 'みき',
      avatar: 'https://picsum.photos/100/100?random=212',
      verified: false
    },
    rank: 2
  },
  {
    id: '3',
    title: '【金髪女子大生】プレゼント第3弾 ♡ 一人は寂しいので',
    thumbnail: 'https://picsum.photos/400/300?random=113',
    duration: '58:31',
    views: 32100,
    likes: 1567,
    bookmarks: 353,
    creator: {
      name: 'あい',
      avatar: 'https://picsum.photos/100/100?random=213',
      verified: true
    },
    rank: 3
  },
  {
    id: '4',
    title: '限定公開のスペシャルプレゼント ♡ 第一弾',
    thumbnail: 'https://picsum.photos/400/300?random=114',
    duration: '1:23:45',
    views: 28700,
    likes: 1234,
    bookmarks: 301,
    creator: {
      name: 'ゆな',
      avatar: 'https://picsum.photos/100/100?random=214',
      verified: false
    },
    rank: 4
  },
  {
    id: '5',
    title: '夏の思い出作り ♡ 特別企画動画',
    thumbnail: 'https://picsum.photos/400/300?random=115',
    duration: '45:22',
    views: 25300,
    likes: 1089,
    bookmarks: 214,
    creator: {
      name: 'さや',
      avatar: 'https://picsum.photos/100/100?random=215',
      verified: true
    },
    rank: 5
  },
  {
    id: '6',
    title: 'プライベート動画集 Vol.2 限定配信',
    thumbnail: 'https://picsum.photos/400/300?random=116',
    duration: '1:05:18',
    views: 22800,
    likes: 967,
    bookmarks: 204,
    creator: {
      name: 'りお',
      avatar: 'https://picsum.photos/100/100?random=216',
      verified: false
    },
    rank: 6
  }
];

const rankingSections = [
  {
    id: 'overall',
    title: '総合ランキング',
    posts: mockRankingPosts
  },
  {
    id: 'amateur',
    title: 'ハメ撮りランキング',
    posts: mockRankingPosts.slice(0, 4)
  }
];

export default function PostRanking() {
  const [activeTab, setActiveTab] = useState('posts');
  const [activeTimePeriod, setActiveTimePeriod] = useState('daily');

  const tabItems = [
    { id: 'posts', label: '投稿', isActive: activeTab === 'posts' },
    { id: 'creators', label: 'クリエイター', isActive: activeTab === 'creators' }
  ];

  const timePeriodTabs = [
    { id: 'daily', label: '日間', isActive: activeTimePeriod === 'daily' },
    { id: 'weekly', label: '週間', isActive: activeTimePeriod === 'weekly' },
    { id: 'monthly', label: '月間', isActive: activeTimePeriod === 'monthly' },
    { id: 'all', label: '全期間', isActive: activeTimePeriod === 'all' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTimePeriodClick = (periodId: string) => {
    setActiveTimePeriod(periodId);
  };

  return (
    <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />

        <section className="bg-white border-b border-gray-200">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <FilterTabs 
              tabs={tabItems} 
              onTabClick={handleTabClick}
              className="justify-center mb-4"
            />
            <FilterTabs 
              tabs={timePeriodTabs} 
              onTabClick={handleTimePeriodClick}
              className="justify-center"
            />
          </div>
        </section>

        {rankingSections.map((section) => (
          <section key={section.id} className="bg-white py-6 border-t border-gray-200">
            <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Crown className="h-5 w-5 text-primary mr-2" />
                  {section.title}
                </h2>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                  もっと見る
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {section.posts.map((post) => (
                  <RankingCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <BottomNavigation />
      </div>
    </div>
  );
}
