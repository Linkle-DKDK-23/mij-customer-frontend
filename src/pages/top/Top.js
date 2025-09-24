import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import Header from '@/components/common/Header';
import { LoadingSpinner, ErrorMessage, PostsSection } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import PostLibraryNavigationSection from '@/features/top/section/PostLibraryNavigationSection';
import RecommendedGenresSection from '@/features/top/section/RecommendedGenresSection';
import CreatorsSection from '@/features/top/section/CreatorsSection';
import { getTopPageData } from '@/api/endpoints/top';
// const bannerItems: BannerItem[] = [
//   { id: '1', image: 'https://picsum.photos/800/200?random=31', title: 'Featured Content' },
//   { id: '2', image: 'https://picsum.photos/800/200?random=32', title: 'New Releases' },
//   { id: '3', image: 'https://picsum.photos/800/200?random=33', title: 'Popular Now' }
// ];
export default function Top() {
    const navigate = useNavigate();
    const [topPageData, setTopPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchTopPageData = async () => {
            try {
                setLoading(true);
                const data = await getTopPageData();
                setTopPageData(data);
            }
            catch (err) {
                setError('トップページデータの取得に失敗しました');
                console.error('Top page data fetch error:', err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTopPageData();
    }, []);
    const convertToGenres = (genres) => {
        return genres.map(genre => ({
            id: genre.id,
            name: genre.name,
            slug: genre.slug,
            postCount: genre.post_count
        }));
    };
    const convertToPosts = (posts) => {
        return posts.map(post => ({
            id: post.id,
            title: post.description || '',
            thumbnail: post.thumbnail_url || 'https://picsum.photos/300/200?random=1',
            duration: post.duration || 0,
            views: 0,
            likes: 'likes_count' in post ? post.likes_count : 0,
            creator: {
                name: post.creator_name,
                display_name: post.display_name,
                avatar: post.creator_avatar_url || 'https://picsum.photos/40/40?random=1',
                verified: false
            },
            rank: 'rank' in post ? post.rank : undefined,
        }));
    };
    const convertToCreators = (creators) => {
        return creators.map(creator => ({
            id: creator.id,
            name: creator.name,
            display_name: creator.display_name,
            avatar: creator.avatar_url || 'https://picsum.photos/60/60?random=1',
            followers: creator.followers_count,
            verified: false,
            rank: creator.rank
        }));
    };
    const handlePostClick = (postId) => {
        navigate(`/post/detail?post_id=${postId}`);
    };
    const handleCreatorClick = (displayName) => {
        navigate(`/account/profile?display_name=${displayName}`);
    };
    if (loading) {
        return (_jsx("div", { className: "w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16", children: _jsx("div", { className: "min-h-screen bg-gray-50 pb-20 flex items-center justify-center", children: _jsx(LoadingSpinner, { size: "lg" }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16", children: _jsx("div", { className: "min-h-screen bg-gray-50 pb-20 flex items-center justify-center p-6", children: _jsx(ErrorMessage, { message: error, variant: "error" }) }) }));
    }
    if (!topPageData) {
        return (_jsx("div", { className: "w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16", children: _jsx("div", { className: "min-h-screen bg-gray-50 pb-20 flex items-center justify-center", children: _jsx(ErrorMessage, { message: "\u30C7\u30FC\u30BF\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093", variant: "warning" }) }) }));
    }
    return (_jsx("div", { className: "w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16", children: _jsxs("div", { className: "min-h-screen bg-gray-50 pb-20", children: [_jsx(Header, {}), _jsx(PostLibraryNavigationSection, {}), _jsx(RecommendedGenresSection, { genres: convertToGenres(topPageData.genres) }), _jsx(PostsSection, { title: "\u30E9\u30F3\u30AD\u30F3\u30B0", posts: convertToPosts(topPageData.ranking_posts), showRank: true, columns: 2, onPostClick: handlePostClick, onCreatorClick: handleCreatorClick }), _jsx(CreatorsSection, { title: "\u30C8\u30C3\u30D7\u30AF\u30EA\u30A8\u30A4\u30BF\u30FC", creators: convertToCreators(topPageData.top_creators), showRank: true }), _jsx(CreatorsSection, { title: "\u65B0\u4EBA\u30AF\u30EA\u30A8\u30A4\u30BF\u30FC", creators: convertToCreators(topPageData.new_creators) }), _jsx(CreatorsSection, { title: "\u6CE8\u76EE\u30AF\u30EA\u30A8\u30A4\u30BF\u30FC", creators: convertToCreators(topPageData.new_creators) }), _jsx(PostsSection, { title: "\u65B0\u7740\u6295\u7A3F", posts: convertToPosts(topPageData.recent_posts), showRank: false, columns: 2, onPostClick: handlePostClick, onCreatorClick: handleCreatorClick }), _jsx(BottomNavigation, {})] }) }));
}
