import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
import { getAccountInfo } from '@/api/endpoints/account';

// セクションコンポーネントをインポート
import ProfileSection from '@/feateure/account/section/ProfileSection';
import AccountSettingsSection from '@/feateure/account/section/AccountSettingsSection';
import AccountNavigation from '@/feateure/account/component/AccountNavigation';
import CouponManagementSection from '@/feateure/account/section/CouponManagementSection';
import PostManagementSection from '@/feateure/account/section/PostManagementSection';
import SalesSection from '@/feateure/account/section/SalesSection';
import PlanManagementSection from '@/feateure/account/section/PlanManagementSection';

// 型定義をインポート
import { AccountInfo, UserProfile } from '@/feateure/account/types';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'admin' | 'joined' | 'individual' | 'likes'>('admin');
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  
  const navigationItems = [
    { id: 'admin', label: '管理画面', count: 0, isActive: activeTab === 'admin' },
    { id: 'joined', label: '加入中', count: 0, isActive: activeTab === 'joined' },
    { id: 'individual', label: '単品購入', count: 0, isActive: activeTab === 'individual' },
    { id: 'likes', label: 'いいね', count: 0, isActive: activeTab === 'likes' }
  ];

  const mockUser: UserProfile = {
    name: accountInfo?.slug || '',
    username: accountInfo?.display_name || '',
    avatar: accountInfo?.avatar_url ? `https://cdn-dev.mijfans.jp/${accountInfo.avatar_url}` : '/src/assets/no-image.svg',
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
        {activeTab === 'admin' && (
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
