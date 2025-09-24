import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
import { getAccountInfo } from '@/api/endpoints/account';
// セクションコンポーネントをインポート
import ProfileSection from '@/features/account/section/ProfileSection';
import AccountSettingsSection from '@/features/account/section/AccountSettingsSection';
import AccountNavigation from '@/features/account/component/AccountNavigation';
import CouponManagementSection from '@/features/account/section/CouponManagementSection';
import PostManagementSection from '@/features/account/section/PostManagementSection';
import SalesSection from '@/features/account/section/SalesSection';
import PlanManagementSection from '@/features/account/section/PlanManagementSection';
export default function Account() {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('admin');
    const [accountInfo, setAccountInfo] = useState(null);
    const navigationItems = [
        { id: 'admin', label: '管理画面', count: 0, isActive: activeTab === 'admin' },
        { id: 'joined', label: '加入中', count: 0, isActive: activeTab === 'joined' },
        { id: 'individual', label: '単品購入', count: 0, isActive: activeTab === 'individual' },
        { id: 'likes', label: 'いいね', count: 0, isActive: activeTab === 'likes' }
    ];
    const mockUser = {
        name: accountInfo?.slug || '',
        username: accountInfo?.display_name || '',
        avatar: accountInfo?.avatar_url || '/src/assets/no-image.svg',
        followingCount: accountInfo?.following_count || 0,
        followerCount: accountInfo?.followers_count || 0,
        totalLikes: accountInfo?.total_likes || 0
    };
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const data = await getAccountInfo();
                setAccountInfo(data);
            }
            catch (error) {
                console.error('Failed to fetch account info:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAccountInfo();
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "bg-white", children: [_jsx(Header, {}), _jsx("div", { className: "max-w-md mx-auto pt-16", children: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "\u30A2\u30AB\u30A6\u30F3\u30C8\u60C5\u5831\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D..." })] }) }) }), _jsx(BottomNavigation, {})] }));
    }
    return (_jsxs("div", { className: "bg-white", children: [_jsx(Header, {}), _jsxs("div", { className: "max-w-md mx-auto pt-16", children: [_jsx(ProfileSection, { user: mockUser }), _jsx(AccountSettingsSection, {}), _jsx(AccountNavigation, { items: navigationItems, onItemClick: handleTabClick }), activeTab === 'admin' && (_jsxs("div", { className: "px-6 space-y-4 mb-40", children: [_jsx(CouponManagementSection, {}), _jsx(PostManagementSection, { accountInfo: accountInfo }), _jsx(SalesSection, { accountInfo: accountInfo }), _jsx(PlanManagementSection, { accountInfo: accountInfo })] })), activeTab !== 'admin' && (_jsxs("div", { className: "px-6 py-8 text-center text-gray-500", children: [activeTab, "\u306E\u30B3\u30F3\u30C6\u30F3\u30C4"] }))] }), _jsx(BottomNavigation, {})] }));
}
