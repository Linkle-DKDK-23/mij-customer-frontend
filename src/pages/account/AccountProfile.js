import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AccountLayout from '@/features/account/component/AccountLayout';
import AccountNavigation from '@/features/account/component/AccountNavigation';
import { getUserProfileByDisplayName } from '@/api/endpoints/user';
import BottomNavigation from '@/components/common/BottomNavigation';
// セクションコンポーネントをインポート
import ProfileHeaderSection from '@/features/account/AccountProfile/ProfileHeaderSection';
import ProfileInfoSection from '@/features/account/AccountProfile/ProfileInfoSection';
import ContentSection from '@/features/account/AccountProfile/ContentSection';
const NO_IMAGE_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwTDEwMCAxMDBaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTRBRiIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
export default function AccountProfile() {
    const [searchParams] = useSearchParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('posts');
    const displayName = searchParams.get('display_name');
    useEffect(() => {
        if (!displayName) {
            setError('スラッグが指定されていません');
            setLoading(false);
            return;
        }
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getUserProfileByDisplayName(displayName);
                setProfile(data);
            }
            catch (err) {
                setError('プロフィールの取得に失敗しました');
            }
            finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [displayName]);
    if (loading)
        return _jsx("div", { className: "p-6 text-center", children: "\u8AAD\u307F\u8FBC\u307F\u4E2D..." });
    if (error)
        return _jsx("div", { className: "p-6 text-center text-red-500", children: error });
    if (!profile)
        return _jsx("div", { className: "p-6 text-center", children: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093" });
    const navigationItems = [
        { id: 'posts', label: '投稿', count: profile.posts.length, isActive: activeTab === 'posts' },
        { id: 'plans', label: 'プラン', count: profile.plans.length, isActive: activeTab === 'plans' },
        { id: 'individual', label: '単品購入', count: profile.individual_purchases.length, isActive: activeTab === 'individual' },
        { id: 'gacha', label: 'ガチャ', count: profile.gacha_items.length, isActive: activeTab === 'gacha' }
    ];
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    return (_jsxs(AccountLayout, { children: [_jsxs("div", { className: "space-y-6", children: [_jsx(ProfileHeaderSection, { coverUrl: profile.cover_url, avatarUrl: profile.avatar_url, displayName: profile.display_name }), _jsx(ProfileInfoSection, { slug: profile.slug, displayName: profile.display_name, bio: profile.bio, postCount: profile.post_count, followerCount: profile.follower_count, websiteUrl: profile.website_url }), _jsx(AccountNavigation, { items: navigationItems, onItemClick: handleTabClick }), _jsx(ContentSection, { activeTab: activeTab, posts: profile.posts.map(post => ({
                            id: post.id,
                            likes_count: post.likes_count,
                            description: post.description || '',
                            thumbnail_url: post.thumbnail_url,
                            created_at: post.created_at
                        })), plans: profile.plans.map(plan => ({
                            id: plan.id,
                            name: plan.name,
                            description: plan.description,
                            price: 0
                        })), individualPurchases: profile.individual_purchases.map(purchase => ({
                            id: purchase.id,
                            likes_count: purchase.likes_count || 0,
                            description: purchase.description || '',
                            thumbnail_url: purchase.thumbnail_url || '',
                            created_at: purchase.created_at
                        })), gachaItems: profile.gacha_items.map(gacha => ({
                            id: gacha.id,
                            amount: gacha.amount,
                            created_at: gacha.created_at
                        })) })] }), _jsx(BottomNavigation, {})] }));
}
