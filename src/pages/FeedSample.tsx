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
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/custome/BottomNavigation';
import Header from '@/components/custome/Header';
import VideoCard from '@/components/video/VideoCard';

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { cn } from "@/lib/utils";

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

const mockFeedPosts: Post[] = [
  {
    id: '1',
    title: '【限定公開】プライベート動画集 Vol.1',
    thumbnail: 'https://picsum.photos/400/300?random=101',
    duration: '12:34',
    views: 15420,
    likes: 892,
    creator: {
      name: 'あやか',
      avatar: 'https://picsum.photos/100/100?random=201',
      verified: true
    }
  },
  {
    id: '2',
    title: '夏の思い出 ビーチフォト撮影',
    thumbnail: 'https://picsum.photos/400/300?random=102',
    duration: '8:45',
    views: 23100,
    likes: 1340,
    creator: {
      name: 'みお',
      avatar: 'https://picsum.photos/100/100?random=202',
      verified: false
    }
  },
  {
    id: '3',
    title: 'コスプレ撮影会の裏側',
    thumbnail: 'https://picsum.photos/400/300?random=103',
    duration: '15:22',
    views: 8750,
    likes: 567,
    creator: {
      name: 'ゆい',
      avatar: 'https://picsum.photos/100/100?random=203',
      verified: true
    }
  },
  {
    id: '4',
    title: 'お料理配信 パスタ作り',
    thumbnail: 'https://picsum.photos/400/300?random=104',
    duration: '20:15',
    views: 12300,
    likes: 789,
    creator: {
      name: 'さくら',
      avatar: 'https://picsum.photos/100/100?random=204',
      verified: false
    }
  },
  {
    id: '5',
    title: 'ダンス練習動画 新曲振り付け',
    thumbnail: 'https://picsum.photos/400/300?random=105',
    duration: '6:30',
    views: 19800,
    likes: 1120,
    creator: {
      name: 'りな',
      avatar: 'https://picsum.photos/100/100?random=205',
      verified: true
    }
  },
  {
    id: '6',
    title: 'メイクアップチュートリアル',
    thumbnail: 'https://picsum.photos/400/300?random=106',
    duration: '11:45',
    views: 16500,
    likes: 934,
    creator: {
      name: 'えみ',
      avatar: 'https://picsum.photos/100/100?random=206',
      verified: false
    }
  }
];

const bannerItems = [
  { id: '1', image: 'https://picsum.photos/800/200?random=31', title: '夏の特別企画' },
  { id: '2', image: 'https://picsum.photos/800/200?random=32', title: '新人クリエイター特集' },
  { id: '3', image: 'https://picsum.photos/800/200?random=33', title: '人気動画ランキング' }
];

export default function FeedSample() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
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
        <Header />

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
                <span className="font-medium text-xs">視聴履歴</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-6 border-t border-gray-200">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">フィード</h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                もっと見る
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mockFeedPosts.map((post) => (
                <VideoCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        <BottomNavigation />
      </div>
    </div>
  );
}
