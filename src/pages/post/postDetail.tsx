import React, { useEffect, useRef, useState } from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import VerticalVideoCard from '@/components/video/VerticalVideoCard';
import { useSearchParams } from 'react-router-dom';
import { PostDetailData } from '@/api/types/post';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { getPostDetail } from '@/api/endpoints/post';
import PurchaseDialog from '@/components/common/PurchaseDialog';
import SelectPaymentDialog from '@/components/common/SelectPaymentDialog';
import CreditPaymentDialog from '@/components/common/CreditPaymentDialog';
import { createPurchase } from '@/api/endpoints/purchases';

export default function PostDetail() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('post_id');
  const [currentPost, setCurrentPost] = useState<PostDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // ダイアログの状態をオブジェクトで管理
  const [dialogs, setDialogs] = useState({
    purchase: false,
    payment: false,
    creditPayment: false,
		bankTransfer: false
  });
  
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription' | null>(null);
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

  const handlePurchaseClick = () => {
    setDialogs(prev => ({ ...prev, purchase: true }));
  };

  const handlePurchaseConfirm = (type: 'single' | 'subscription') => {
    setPurchaseType(type);
    setDialogs(prev => ({ ...prev, purchase: false, payment: true }));
  };

  const handlePaymentMethodSelect = (method: string) => {
    if (method === 'credit_card') {
      setDialogs(prev => ({ ...prev, payment: false, creditPayment: true }));
    } else if (method === 'bank_transfer') {
      setDialogs(prev => ({ ...prev, payment: false, bankTransfer: true }));
    } else {
      // 他の支払い方法の処理
      setDialogs(prev => ({ ...prev, payment: false }));
    }		
  };

  // 共通のダイアログクローズ関数
  const closeDialog = (dialogName: keyof typeof dialogs) => {
    setDialogs(prev => ({ ...prev, [dialogName]: false }));
  };

  // fetchPostDetail関数を抽出
  const fetchPostDetail = async () => {
    if (!postId) return;
    
    try {
      setLoading(true);
      const data = await getPostDetail(postId);
      setCurrentPost(data);
    } catch (error) {
      console.error('Failed to fetch post detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
		// TODO: 自動で購入動画に切り替わるように修正
    const formData = {
      post_id: currentPost?.id,
      plan_id: purchaseType === 'single' ? currentPost?.single.id : currentPost?.subscription.id,
    }

    try {
      const res = await createPurchase(formData);

      if (res.status === 200) {

				await fetchPostDetail();
				setTimeout(() => {
					closeDialog('creditPayment');
					closeDialog('payment');
					closeDialog('purchase');
					closeDialog('bankTransfer');
				}, 100); // 少し遅延させる
      }
    } catch (error) {
      console.error('Failed to create purchase:', error);
    }
  };

  useEffect(() => {
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
					isOpen={dialogs.purchase}
					onClose={() => closeDialog('purchase')}
					post={currentPost}
					onPurchase={handlePurchaseConfirm}
				/>
			)}
			{/* 支払いダイアログ */}
			{currentPost && (
				<SelectPaymentDialog
					isOpen={dialogs.payment}
					onClose={() => closeDialog('payment')}
					post={currentPost}
					onPaymentMethodSelect={handlePaymentMethodSelect}
					purchaseType={purchaseType}
				/>
			)}
			{/* クレジットカード決済ダイアログ */}
			{currentPost && dialogs.creditPayment && (
				<CreditPaymentDialog
					isOpen={dialogs.creditPayment}
					onClose={() => closeDialog('creditPayment')}
					onPayment={handlePayment}
					post={currentPost}
					purchaseType={purchaseType}
				/>
			)}

		</div>
  );
}