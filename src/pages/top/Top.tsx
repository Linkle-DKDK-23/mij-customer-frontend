import React, { useEffect, useRef, useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  ShoppingCart, 
  Bookmark, 
  Heart, 
  History, 
  ChevronRight, 
  Play, 
  Clock, 
  Eye, 
  Star,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/common/BottomNavigation';
import Header from '@/components/common/Header';

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { cn } from "@/lib/utils"; // Tailwindのclass結合用（必要に応じて）
import { useNavigate } from 'react-router-dom';

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
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  verified: boolean;
  rank?: number;
}

interface Genre {
  id: string;
  name: string;
  postCount: number;
}

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

const bannerItems = [
  { id: '1', image: 'https://picsum.photos/800/200?random=31', title: 'Featured Content' },
  { id: '2', image: 'https://picsum.photos/800/200?random=32', title: 'New Releases' },
  { id: '3', image: 'https://picsum.photos/800/200?random=33', title: 'Popular Now' }
];

export default function Top() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      origin: "center",
      perView: 1,
      spacing: 16,
    },
    renderMode: "performance",
  });

  // 自動スライド処理
  // 自動スライド
  useEffect(() => {
    if (!instanceRef.current) return;

    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [instanceRef]);


  return (
    <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <Header />

        {/* Banner Carousel */}
        <section className="bg-white">
          <div className="max-w-screen-sm mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div ref={sliderRef} className="keen-slider">
              {bannerItems.map((banner, idx) => (
                <div
                  key={banner.id}
                  className="keen-slider__slide flex-shrink-0 w-[80%] md:w-[60%] h-60 relative rounded-lg overflow-hidden"
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-white font-semibold text-lg">{banner.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {bannerItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={cn(
                    "w-3 h-3 rounded-full",
                    idx === currentSlide ? "bg-primary" : "bg-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Post Library Navigation */}
        <section className="max-w-screen-md mx-auto bg-white border-b border-gray-200">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-around w-full py-4">
              <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium text-xs">購入済み</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
                <Bookmark className="h-5 w-5" />
                <span className="font-medium text-xs">保存済み</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
                <Heart className="h-5 w-5" />
                <span className="font-medium text-xs">いいね済み</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
                <History className="h-5 w-5" />
                <span className="font-medium text-xs">閲覧履歴</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Genres */}
        <section className="bg-white py-6">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">おすすめジャンル</h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-pink-600">
                もっと見る
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mockGenres.map((genre) => (
                <div key={genre.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors">
                  <h3 className="font-medium text-gray-900 text-sm">{genre.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{genre.postCount.toLocaleString()} posts</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ランキング */}
        <section className="bg-white py-6 border-t border-gray-200">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">ランキング</h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                もっと見る
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mockPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                      {post.rank === 1 && <Crown className="h-3 w-3 mr-1" />}
                      #{post.rank}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{post.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <img 
                        src={post.creator.avatar} 
                        alt={post.creator.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-600 flex items-center">
                        {post.creator.name}
                        {post.creator.verified && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {post.likes.toLocaleString()}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Bookmark className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* トップクリエイター */}
        <section className="bg-white py-6 border-t border-gray-200">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">トップクリエイター</h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-pink-600">
                もっと見る
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
              {mockCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="min-w-[240px] bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex-shrink-0"
                >
                  <div className="text-center">

                    <div onClick={() => navigate(`/creator/profile`)}>
                      <div className="relative inline-block mb-3">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-16 h-16 rounded-full mx-auto"
                        />
                        <div className="absolute -top-1 -left-1 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                          {creator.rank}
                        </div>
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1 flex items-center justify-center">
                        {creator.name}
                        {creator.verified && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">{creator.followers.toLocaleString()} followers</p>
                    </div>

                    <Button size="sm" className="w-full bg-primary hover:bg-pink-600 text-white">
                      フォロー
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 新人クリエイター */}
        <section className="bg-white py-6 border-t border-gray-200">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">新人クリエイター</h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-pink-600">
                もっと見る
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
              {mockCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="min-w-[240px] bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex-shrink-0"
                >
                  <div className="text-center">
                    <div className="relative inline-block mb-3">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-16 h-16 rounded-full mx-auto"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1 flex items-center justify-center">
                      {creator.name}
                      {creator.verified && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">{creator.followers.toLocaleString()} followers</p>
                    <Button size="sm" className="w-full bg-primary hover:bg-pink-600 text-white">
                      フォロー
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 注目クリエイター */}
        <section className="bg-white py-6 border-t border-gray-200">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">注目クリエイター</h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-pink-600">
                もっと見る
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
              {mockCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="min-w-[240px] bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex-shrink-0"
                >
                  <div className="text-center">
                    <div className="relative inline-block mb-3">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-16 h-16 rounded-full mx-auto"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1 flex items-center justify-center">
                      {creator.name}
                      {creator.verified && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">{creator.followers.toLocaleString()} followers</p>
                    <Button size="sm" className="w-full bg-primary hover:bg-pink-600 text-white">
                      フォロー
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 新着投稿 */}
        <section className="bg-white py-6 border-t border-gray-200">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">新着投稿</h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                もっと見る
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mockPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{post.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <img 
                        src={post.creator.avatar} 
                        alt={post.creator.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-600 flex items-center">
                        {post.creator.name}
                        {post.creator.verified && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {post.likes.toLocaleString()}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Bookmark className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Fixed Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
}
