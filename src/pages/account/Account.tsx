import React, { useState, useEffect } from 'react';
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
import { useAuth } from '@/providers/AuthContext';

// 型定義をインポート
import { AccountInfo, UserProfile } from '@/features/account/types';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'admin' | 'joined' | 'individual' | 'likes'>('admin');
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);

  const { user } = useAuth();
  
  const baseNavigationItems = [
    { id: 'joined', label: '加入中', count: 0, isActive: activeTab === 'joined' },
    { id: 'individual', label: '単品購入', count: 0, isActive: activeTab === 'individual' },
    { id: 'likes', label: 'いいね', count: 0, isActive: activeTab === 'likes' }
  ];

  const navigationItems = user?.role === 2 
    ? [
        { id: 'admin', label: '管理画面', count: 0, isActive: activeTab === 'admin' },
        ...baseNavigationItems
      ]
    : baseNavigationItems;

  const mockUser: UserProfile = {
    name: accountInfo?.slug || '',
    username: accountInfo?.display_name || '',
    avatar: accountInfo?.avatar_url || '/src/assets/no-image.svg',
    followingCount: accountInfo?.following_count || 0,
    followerCount: accountInfo?.followers_count || 0,
    totalLikes: accountInfo?.total_likes || 0
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as 'admin' | 'joined' | 'individual' | 'likes');
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await getAccountInfo();
        setAccountInfo(data);
      } catch (error) {
        console.error('Failed to fetch account info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, []);



  if (loading) {
    return (
      <div className="bg-white">
        <Header />
        <div className="max-w-md mx-auto pt-16">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">アカウント情報を読み込み中...</p>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Header />
      <div className="max-w-md mx-auto pt-16">
        {/* Profile Section */}
        <ProfileSection user={mockUser} />

        {/* Account Settings Link */}
        <AccountSettingsSection />

        {/* Tab Navigation */}
        {/* Navigation */}
        <AccountNavigation items={navigationItems} onItemClick={handleTabClick} />

        {/* Management Content */}
        {activeTab === 'admin' && user?.role === 2 && (
          <div className="px-6 space-y-4 mb-40">
            {/* Coupon Management */}
            <CouponManagementSection />

            {/* Post Management */}
            <PostManagementSection accountInfo={accountInfo} />

            {/* Sales */}
            <SalesSection accountInfo={accountInfo} />

            {/* Plan Management */}
            <PlanManagementSection accountInfo={accountInfo} />
          </div>
        )}

        {/* Other tabs content (placeholder) */}
        {activeTab !== 'admin' && (
          <div className="px-6 py-8 text-center text-gray-500">
            {activeTab}のコンテンツ
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}
