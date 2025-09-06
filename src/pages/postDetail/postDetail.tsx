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
import BottomNavigation from '@/components/common/BottomNavigation';
import Header from '@/components/common/Header';
import VerticalVideoCard from '@/components/video/VerticalVideoCard';
import { useSearchParams } from 'react-router-dom';

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { cn } from "@/lib/utils";

import { getPostDetail } from '@/api/endpoints/post';


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
  videoUrl?: string;
}

const mockFeedPosts: Post[] = [
  {
    id: '1',
    title: '【限定公開】プライベート動画集 Vol.1 - 夏の思い出を特別にお届け♡',
    thumbnail: 'https://picsum.photos/400/600?random=101',
    duration: '12:34',
    views: 15420,
    likes: 892,
    creator: {
      name: 'あやか',
      avatar: 'https://picsum.photos/100/100?random=201',
      verified: true
    },
    videoUrl: 'https://picsum.photos/400/600?random=101'
  },
  {
    id: '2',
    title: '夏の思い出 ビーチフォト撮影 - 海辺での特別な一日をシェア',
    thumbnail: 'https://picsum.photos/400/600?random=102',
    duration: '8:45',
    views: 23100,
    likes: 1340,
    creator: {
      name: 'みお',
      avatar: 'https://picsum.photos/100/100?random=202',
      verified: false
    },
    videoUrl: 'https://picsum.photos/400/600?random=102'
  },
  {
    id: '3',
    title: 'コスプレ撮影会の裏側 - メイキング映像を初公開！',
    thumbnail: 'https://picsum.photos/400/600?random=103',
    duration: '15:22',
    views: 8750,
    likes: 567,
    creator: {
      name: 'ゆい',
      avatar: 'https://picsum.photos/100/100?random=203',
      verified: true
    },
    videoUrl: 'https://picsum.photos/400/600?random=103'
  },
  {
    id: '4',
    title: 'お料理配信 パスタ作り - 簡単レシピを紹介します♪',
    thumbnail: 'https://picsum.photos/400/600?random=104',
    duration: '20:15',
    views: 12300,
    likes: 789,
    creator: {
      name: 'さくら',
      avatar: 'https://picsum.photos/100/100?random=204',
      verified: false
    },
    videoUrl: 'https://picsum.photos/400/600?random=104'
  },
  {
    id: '5',
    title: 'ダンス練習動画 新曲振り付け - 一緒に踊りましょう！',
    thumbnail: 'https://picsum.photos/400/600?random=105',
    duration: '6:30',
    views: 19800,
    likes: 1120,
    creator: {
      name: 'りな',
      avatar: 'https://picsum.photos/100/100?random=205',
      verified: true
    },
    videoUrl: 'https://picsum.photos/400/600?random=105'
  },
  {
    id: '6',
    title: 'メイクアップチュートリアル - 今日のメイクのポイント解説',
    thumbnail: 'https://picsum.photos/400/600?random=106',
    duration: '11:45',
    views: 16500,
    likes: 934,
    creator: {
      name: 'えみ',
      avatar: 'https://picsum.photos/100/100?random=206',
      verified: false
    },
    videoUrl: 'https://picsum.photos/400/600?random=106'
  }
];


const bannerItems = [
  { id: '1', image: 'https://picsum.photos/800/200?random=31', title: '夏の特別企画' },
  { id: '2', image: 'https://picsum.photos/800/200?random=32', title: '新人クリエイター特集' },
  { id: '3', image: 'https://picsum.photos/800/200?random=33', title: '人気動画ランキング' }
];


export default function PostDetail() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('post_id');

	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    vertical: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    slideChanged(slider) {
      setCurrentVideoIndex(slider.track.details.rel);
    },
    renderMode: "performance",
  });

  const handleVideoClick = (index: number) => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(index);
    }
  };

  useEffect(() => {
		const fetchPostDetail = async () => {
			try {
				const data = await getPostDetail(postId);
				console.log('data', data);
			} catch (error) {
				console.error('Failed to fetch post detail:', error);
			}
		};
		fetchPostDetail();
  }, [postId]);

  return (
		<div
			className="w-full h-screen bg-black overflow-hidden relative"
			style={{ ['--nav-h' as any]: '72px' }} // ← BottomNavigation の実高さに合わせる（例: 72px）
		>

			{/* スライダー本体：下にナビの高さぶん余白 */}
			<div
				ref={sliderRef}
				className="
					keen-slider h-full
					pb-[var(--nav-h)]
					pb-[calc(var(--nav-h)+env(safe-area-inset-bottom))]
				"
			>
				{mockFeedPosts.map((post, index) => (
					<div key={post.id} className="keen-slider__slide">
						<VerticalVideoCard
							post={post}
							isActive={index === currentVideoIndex}
							onVideoClick={() => handleVideoClick(index)}
						/>
					</div>
				))}
			</div>

			{/* 絶対配置のまま */}
			<div className="absolute bottom-0 left-0 right-0 z-50">
				<BottomNavigation />
			</div>
		</div>
  );
}