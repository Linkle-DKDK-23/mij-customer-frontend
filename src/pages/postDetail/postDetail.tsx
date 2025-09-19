import React, { useEffect, useRef, useState } from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import VerticalVideoCard from '@/components/video/VerticalVideoCard';
import { useSearchParams } from 'react-router-dom';
import { PostDetailData } from '@/api/types/post';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { getPostDetail } from '@/api/endpoints/post';
import PurchaseDialog from '@/components/common/PurchaseDialog';
import PaymentDialog from '@/components/common/PaymentDialog';

export default function PostDetail() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('post_id');
  const [currentPost, setCurrentPost] = useState<PostDetailData | null>(null);
  const [loading, setLoading] = useState(true);
	const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
	const [showPaymentDialog, setShowPaymentDialog] = useState(false);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [purchaseType, setPurchaseType] = useState<'single' | 'subscription' | null>(null);
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

  const handlePurchaseClick = () => {
    setShowPurchaseDialog(true);
  };

  const handlePurchaseConfirm = (type: 'single' | 'subscription') => {
		setPurchaseType(type);
    setShowPurchaseDialog(false);
    // 実際の購入処理は後で実装
    setShowPaymentDialog(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    console.log("選択された支払い方法:", method);
    // ここで実際の決済処理を実装
    // 例: クレジットカード決済、コンビニ決済など
  };

  const handlePaymentDialogClose = () => {
    setShowPaymentDialog(false);
  };



  const handlePurchaseDialogClose = () => {
    setShowPurchaseDialog(false);
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
						onPurchaseClick={handlePurchaseClick}
					/>
				</div>
			</div>

			{/* 絶対配置のまま */}
			<div className="absolute bottom-0 left-0 right-0 z-50">
				<BottomNavigation />
			</div>
			{/* 購入ダイアログ */}
			{currentPost && (
				<PurchaseDialog
					isOpen={showPurchaseDialog}
					onClose={handlePurchaseDialogClose}
					post={currentPost}
					onPurchase={handlePurchaseConfirm}
				/>
			)}
			{/* 支払いダイアログ */}
			{currentPost && (
				<PaymentDialog
					isOpen={showPaymentDialog}
					onClose={handlePaymentDialogClose}
					post={currentPost}
					onPaymentMethodSelect={handlePaymentMethodSelect}
					purchaseType={purchaseType}
				/>
			)}
		</div>
  );
}