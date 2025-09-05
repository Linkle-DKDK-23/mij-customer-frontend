import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
import FilterSection from '@/feateure/postRanking/section/FilterSection';
import RankingListSection from '@/feateure/postRanking/section/RankingListSection';
import { RankingResponse, RankingSection, TabItem } from '@/feateure/postRanking/types';
import { getRanking } from '@/api/endpoints/ranking';

const rankingSections: RankingSection[] = [
  {
    id: 'overall',
    title: '総合ランキング',
    posts: []
  },
  {
    id: 'amateur',
    title: 'ハメ撮りランキング',
    posts: []
  }
  ];

export default function PostRanking() {
  const [activeTab, setActiveTab] = useState('posts');
  const [activeTimePeriod, setActiveTimePeriod] = useState('daily');
  const [rankingData, setRankingData] = useState<RankingResponse | null>(null);
  const [currentPosts, setCurrentPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await getRanking();
        setRankingData(response);
        setCurrentPosts(response.daily || []);
      } catch (error) {
        console.error('Error fetching ranking:', error);
      }
    };
    fetchRanking();
  }, []);

  // Update current posts when time period changes
  useEffect(() => {
    if (rankingData) {
      switch (activeTimePeriod) {
        case 'daily':
          setCurrentPosts(rankingData.daily || []);
          break;
        case 'weekly':
          setCurrentPosts(rankingData.weekly || []);
          break;
        case 'monthly':
          setCurrentPosts(rankingData.monthly || []);
          break;
        case 'all':
          setCurrentPosts(rankingData.all_time || []);
          break;
        default:
          setCurrentPosts(rankingData.daily || []);
      }
    }
  }, [activeTimePeriod, rankingData]);

  const tabItems: TabItem[] = [
    { id: 'posts', label: '投稿', isActive: activeTab === 'posts' },
    { id: 'creators', label: 'クリエイター', isActive: activeTab === 'creators' }
  ];

  const timePeriodTabs: TabItem[] = [
    { id: 'daily', label: '日間', isActive: activeTimePeriod === 'daily' },
    { id: 'weekly', label: '週間', isActive: activeTimePeriod === 'weekly' },
    { id: 'monthly', label: '月間', isActive: activeTimePeriod === 'monthly' },
    { id: 'all', label: '全期間', isActive: activeTimePeriod === 'all' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTimePeriodClick = (periodId: string) => {
    setActiveTimePeriod(periodId);
  };

  // Update ranking sections with current posts
  const updatedRankingSections = rankingSections.map(section => ({
    ...section,
    posts: currentPosts
  }));

  return (
    <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        <FilterSection 
          tabItems={tabItems}
          timePeriodTabs={timePeriodTabs}
          onTabClick={handleTabClick}
          onTimePeriodClick={handleTimePeriodClick}
        />
        <RankingListSection sections={updatedRankingSections} posts={currentPosts} />
        <BottomNavigation />
      </div>
    </div>
  );
}
