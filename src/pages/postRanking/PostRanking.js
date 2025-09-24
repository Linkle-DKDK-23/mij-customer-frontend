import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
import FilterSection from '@/features/postRanking/section/FilterSection';
import PostsSection from '@/components/common/PostsSection';
import { getRanking } from '@/api/endpoints/ranking';
export default function PostRanking() {
    const [activeTab, setActiveTab] = useState('posts');
    const [activeTimePeriod, setActiveTimePeriod] = useState('daily');
    const [rankingData, setRankingData] = useState(null);
    const [currentPosts, setCurrentPosts] = useState([]);
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await getRanking();
                setRankingData(response);
                setCurrentPosts(response.daily || []);
            }
            catch (error) {
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
    const tabItems = [
        { id: 'posts', label: '投稿', isActive: activeTab === 'posts' },
        { id: 'creators', label: 'クリエイター', isActive: activeTab === 'creators' }
    ];
    const timePeriodTabs = [
        { id: 'daily', label: '日間', isActive: activeTimePeriod === 'daily' },
        { id: 'weekly', label: '週間', isActive: activeTimePeriod === 'weekly' },
        { id: 'monthly', label: '月間', isActive: activeTimePeriod === 'monthly' },
        { id: 'all', label: '全期間', isActive: activeTimePeriod === 'all' }
    ];
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const handleTimePeriodClick = (periodId) => {
        setActiveTimePeriod(periodId);
    };
    // Convert ranking posts to PostCardProps format
    const convertToPostCards = (posts) => {
        return posts.map(post => ({
            id: post.id,
            title: post.description || '',
            thumbnail: post.thumbnail_url || '',
            duration: '00:00',
            views: 0,
            likes: post.likes_count || 0,
            creator: {
                name: post.creator_name || '',
                display_name: post.display_name || '',
                avatar: post.creator_avatar_url || '',
                verified: false
            },
            rank: post.rank
        }));
    };
    return (_jsx("div", { className: "w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16", children: _jsxs("div", { className: "min-h-screen bg-gray-50 pb-20", children: [_jsx(Header, {}), _jsx(FilterSection, { tabItems: tabItems, timePeriodTabs: timePeriodTabs, onTabClick: handleTabClick, onTimePeriodClick: handleTimePeriodClick }), _jsx(PostsSection, { title: activeTab === 'posts' ? '総合ランキング' : 'クリエイターランキング', posts: convertToPostCards(currentPosts), showRank: true, columns: 2, onPostClick: () => { } }), _jsx(BottomNavigation, {})] }) }));
}
