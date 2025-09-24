import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getPostsByCategory } from '@/api/endpoints/post';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
import PostsSection from '@/components/common/PostsSection';
export default function Category() {
    const [searchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const slug = searchParams.get('slug');
    const navigate = useNavigate();
    useEffect(() => {
        if (!slug) {
            navigate('/');
        }
        const fetchCategory = async () => {
            try {
                const response = await getPostsByCategory(slug);
                console.log('response', response);
                setPosts(response);
            }
            catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        fetchCategory();
    }, [slug]);
    const convertToPosts = (posts) => {
        return posts.map(post => ({
            id: post.id,
            title: post.description || '',
            thumbnail: post.thumbnail_url || 'https://picsum.photos/300/200?random=1',
            duration: '00:00',
            views: 0,
            likes: post.likes_count,
            creator: {
                name: post.creator_name,
                display_name: post.display_name,
                avatar: post.creator_avatar_url || 'https://picsum.photos/40/40?random=1',
                verified: false
            },
            rank: undefined
        }));
    };
    return (_jsxs("div", { className: "w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16", children: [_jsx(Header, {}), _jsx(PostsSection, { title: "\u30AB\u30C6\u30B4\u30EA\u30FC\u5225\u30E9\u30F3\u30AD\u30F3\u30B0", posts: convertToPosts(posts), showRank: false, columns: 2, onPostClick: () => { } }), _jsx(BottomNavigation, {})] }));
}
