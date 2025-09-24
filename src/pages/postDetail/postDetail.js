import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import VerticalVideoCard from '@/components/video/VerticalVideoCard';
import { useSearchParams } from 'react-router-dom';
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
    const [currentPost, setCurrentPost] = useState(null);
    const [loading, setLoading] = useState(true);
    // ダイアログの状態をオブジェクトで管理
    const [dialogs, setDialogs] = useState({
        purchase: false,
        payment: false,
        creditPayment: false,
        bankTransfer: false
    });
    const [purchaseType, setPurchaseType] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
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
    const handleVideoClick = (index) => {
        if (instanceRef.current) {
            instanceRef.current.moveToIdx(index);
        }
    };
    const handlePurchaseClick = () => {
        setDialogs(prev => ({ ...prev, purchase: true }));
    };
    const handlePurchaseConfirm = (type) => {
        setPurchaseType(type);
        setDialogs(prev => ({ ...prev, purchase: false, payment: true }));
    };
    const handlePaymentMethodSelect = (method) => {
        if (method === 'credit_card') {
            setDialogs(prev => ({ ...prev, payment: false, creditPayment: true }));
        }
        else if (method === 'bank_transfer') {
            setDialogs(prev => ({ ...prev, payment: false, bankTransfer: true }));
        }
        else {
            // 他の支払い方法の処理
            setDialogs(prev => ({ ...prev, payment: false }));
        }
    };
    // 共通のダイアログクローズ関数
    const closeDialog = (dialogName) => {
        setDialogs(prev => ({ ...prev, [dialogName]: false }));
    };
    // fetchPostDetail関数を抽出
    const fetchPostDetail = async () => {
        if (!postId)
            return;
        try {
            setLoading(true);
            const data = await getPostDetail(postId);
            setCurrentPost(data);
        }
        catch (error) {
            console.error('Failed to fetch post detail:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handlePayment = async () => {
        // TODO: 自動で購入動画に切り替わるように修正
        const formData = {
            post_id: currentPost?.id,
            plan_id: purchaseType === 'single' ? currentPost?.single.id : currentPost?.subscription.id,
        };
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
        }
        catch (error) {
            console.error('Failed to create purchase:', error);
        }
    };
    useEffect(() => {
        fetchPostDetail();
    }, [postId]);
    if (loading) {
        return (_jsx("div", { className: "w-full h-screen bg-black flex items-center justify-center", children: _jsx("div", { className: "text-white", children: "\u8AAD\u307F\u8FBC\u307F\u4E2D..." }) }));
    }
    if (!currentPost) {
        return (_jsx("div", { className: "w-full h-screen bg-black flex items-center justify-center", children: _jsx("div", { className: "text-white", children: "\u6295\u7A3F\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093" }) }));
    }
    return (_jsxs("div", { className: "w-full h-screen bg-black overflow-hidden relative", style: { ['--nav-h']: '72px' }, children: [_jsx("div", { ref: sliderRef, className: "\n\t\t\t\t\tkeen-slider h-full\n\t\t\t\t\tpb-[var(--nav-h)]\n\t\t\t\t\tpb-[calc(var(--nav-h)+env(safe-area-inset-bottom))]\n\t\t\t\t", children: _jsx("div", { className: "keen-slider__slide", children: _jsx(VerticalVideoCard, { post: {
                            ...currentPost,
                            video_url: currentPost.video_url
                        }, isActive: true, onVideoClick: () => { }, onPurchaseClick: handlePurchaseClick }) }) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 z-50", children: _jsx(BottomNavigation, {}) }), currentPost && (_jsx(PurchaseDialog, { isOpen: dialogs.purchase, onClose: () => closeDialog('purchase'), post: currentPost, onPurchase: handlePurchaseConfirm })), currentPost && (_jsx(SelectPaymentDialog, { isOpen: dialogs.payment, onClose: () => closeDialog('payment'), post: currentPost, onPaymentMethodSelect: handlePaymentMethodSelect, purchaseType: purchaseType })), currentPost && dialogs.creditPayment && (_jsx(CreditPaymentDialog, { isOpen: dialogs.creditPayment, onClose: () => closeDialog('creditPayment'), onPayment: handlePayment, post: currentPost, purchaseType: purchaseType }))] }));
}
