import React, { useEffect, useRef, useState } from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import VerticalVideoCard from '@/components/video/VerticalVideoCard';
import { useSearchParams } from 'react-router-dom';
import { PostDetailData } from '@/api/types/post';
import { Heart, MessageCircle, Share, Bookmark, Play, ArrowLeft, MoreHorizontal } from 'lucide-react';

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { getPostDetail } from '@/api/endpoints/post';

export default function PostDetail() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('post_id');
  const [currentPost, setCurrentPost] = useState<PostDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
			if (!postId) return;
			
			try {
				setLoading(true);
				const data = await getPostDetail(postId);
				console.log('data', data);
				setCurrentPost(data);
			} catch (error) {
				console.error('Failed to fetch post detail:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchPostDetail();
  }, [postId]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white">読み込み中...</div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white">投稿が見つかりません</div>
      </div>
    );
  }

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
				<div className="keen-slider__slide">
					<VerticalVideoCard
						post={{
							...currentPost,
							video_url: currentPost.video_url
						}}
						isActive={true}
						onVideoClick={() => {}}
					/>
				</div>
			</div>

			{/* 絶対配置のまま */}
			<div className="absolute bottom-0 left-0 right-0 z-50">
				<BottomNavigation />
			</div>
			</div>
  );
}