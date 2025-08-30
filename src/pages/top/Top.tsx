import React from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import Header from '@/components/common/Header';

// セクションコンポーネントをインポート
import BannerCarouselSection from '@/feateure/top/section/BannerCarouselSection';
import PostLibraryNavigationSection from '@/feateure/top/section/PostLibraryNavigationSection';
import RecommendedGenresSection from '@/feateure/top/section/RecommendedGenresSection';
import RankingSection from '@/feateure/top/section/RankingSection';
import CreatorsSection from '@/feateure/top/section/CreatorsSection';
import RecentPostsSection from '@/feateure/top/section/RecentPostsSection';

// 型定義をインポート
import { Post, Creator, Genre, BannerItem } from '@/feateure/top/types';

// モックデータ
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Beautiful sunset photography session',
    thumbnail: 'https://picsum.photos/300/200?random=1',
    duration: '12:34',
    views: 15420,
    likes: 892,
    creator: {
      name: 'PhotoArtist',
      avatar: 'https://picsum.photos/40/40?random=11',
      verified: true
    },
    rank: 1
  },
  {
    id: '2',
    title: 'Urban street art exploration',
    thumbnail: 'https://picsum.photos/300/200?random=2',
    duration: '8:45',
    views: 12350,
    likes: 654,
    creator: {
      name: 'StreetVibes',
      avatar: 'https://picsum.photos/40/40?random=12',
      verified: false
    },
    rank: 2
  },
  {
    id: '3',
    title: 'Cooking masterclass series',
    thumbnail: 'https://picsum.photos/300/200?random=3',
    duration: '25:12',
    views: 9876,
    likes: 543,
    creator: {
      name: 'ChefMaster',
      avatar: 'https://picsum.photos/40/40?random=13',
      verified: true
    },
    rank: 3
  },
  {
    id: '4',
    title: 'Nature documentary highlights',
    thumbnail: 'https://picsum.photos/300/200?random=4',
    duration: '18:30',
    views: 8765,
    likes: 432,
    creator: {
      name: 'NatureDoc',
      avatar: 'https://picsum.photos/40/40?random=14',
      verified: true
    },
    rank: 4
  },
  {
    id: '5',
    title: 'Music production tutorial',
    thumbnail: 'https://picsum.photos/300/200?random=5',
    duration: '15:22',
    views: 7654,
    likes: 321,
    creator: {
      name: 'BeatMaker',
      avatar: 'https://picsum.photos/40/40?random=15',
      verified: false
    },
    rank: 5
  }
];

const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'TopCreator',
    avatar: 'https://picsum.photos/60/60?random=21',
    followers: 125000,
    verified: true,
    rank: 1
  },
  {
    id: '2',
    name: 'ArtisticSoul',
    avatar: 'https://picsum.photos/60/60?random=22',
    followers: 98000,
    verified: true,
    rank: 2
  },
  {
    id: '3',
    name: 'CreativeMinds',
    avatar: 'https://picsum.photos/60/60?random=23',
    followers: 87000,
    verified: false,
    rank: 3
  },
  {
    id: '4',
    name: 'VisualStory',
    avatar: 'https://picsum.photos/60/60?random=24',
    followers: 76000,
    verified: true,
    rank: 4
  },
  {
    id: '5',
    name: 'ContentKing',
    avatar: 'https://picsum.photos/60/60?random=25',
    followers: 65000,
    verified: false,
    rank: 5
  }
];

const mockGenres: Genre[] = [
  { id: '1', name: 'Photography', postCount: 1234 },
  { id: '2', name: 'Art & Design', postCount: 987 },
  { id: '3', name: 'Cooking', postCount: 765 },
  { id: '4', name: 'Music', postCount: 654 },
  { id: '5', name: 'Travel', postCount: 543 },
  { id: '6', name: 'Fashion', postCount: 432 },
  { id: '7', name: 'Technology', postCount: 321 },
  { id: '8', name: 'Fitness', postCount: 210 }
];

const bannerItems: BannerItem[] = [
  { id: '1', image: 'https://picsum.photos/800/200?random=31', title: 'Featured Content' },
  { id: '2', image: 'https://picsum.photos/800/200?random=32', title: 'New Releases' },
  { id: '3', image: 'https://picsum.photos/800/200?random=33', title: 'Popular Now' }
];

export default function Top() {
  return (
    <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <Header />

        {/* Banner Carousel */}
        <BannerCarouselSection bannerItems={bannerItems} />

        {/* Post Library Navigation */}
        <PostLibraryNavigationSection />

        {/* Recommended Genres */}
        <RecommendedGenresSection genres={mockGenres} />

        {/* ランキング */}
        <RankingSection posts={mockPosts} />

        {/* トップクリエイター */}
        <CreatorsSection 
          title="トップクリエイター" 
          creators={mockCreators} 
          showRank={true}
        />

        {/* 新人クリエイター */}
        <CreatorsSection 
          title="新人クリエイター" 
          creators={mockCreators} 
        />

        {/* 注目クリエイター */}
        <CreatorsSection 
          title="注目クリエイター" 
          creators={mockCreators} 
        />

        {/* 新着投稿 */}
        <RecentPostsSection posts={mockPosts} />

        {/* Fixed Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
}
