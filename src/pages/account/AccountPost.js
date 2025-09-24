import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import AccountHeader from '@/features/account/component/AccountHeader';
import AccountNavigation from '@/features/account/component/AccountNavigation';
// セクションコンポーネントをインポート
import PostContentSection from '@/features/account/AccountPost/PostContentSection';
import { getAccountPosts } from '@/api/endpoints/account';
const statusLabels = {
    review: '審査中',
    revision: '要修正',
    private: '非公開',
    published: '公開済み',
    deleted: '削除'
};
// Map API status to component status
const mapApiStatusToComponentStatus = (apiStatus) => {
    switch (apiStatus) {
        case 'pending_posts':
            return 'review';
        case 'rejected_posts':
            return 'revision';
        case 'unpublished_posts':
            return 'private';
        case 'approved_posts':
            return 'published';
        case 'deleted_posts':
            return 'deleted';
        default:
            return 'published';
    }
};
// Map API response to component format
const mapApiPostToComponentPost = (apiPost, status) => {
    return {
        id: apiPost.id,
        title: apiPost.description,
        thumbnail: apiPost.thumbnail_url || '/assets/no-image.svg',
        status: status,
        date: new Date().toLocaleDateString('ja-JP'),
        price: apiPost.price || 0, // Provide default value
        currency: apiPost.currency
    };
};
export default function AccountPost() {
    const [activeStatus, setActiveStatus] = useState('published');
    const [posts, setPosts] = useState([]);
    const [statusCounts, setStatusCounts] = useState({
        review: 0,
        revision: 0,
        private: 0,
        published: 0,
        deleted: 0
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await getAccountPosts();
                console.log(response);
                // Calculate counts for each status
                const counts = {
                    review: response.pending_posts.length,
                    revision: response.rejected_posts.length,
                    private: response.unpublished_posts.length,
                    published: response.approved_posts.length,
                    deleted: response.deleted_posts.length
                };
                setStatusCounts(counts);
                // Map all posts to component format
                const allPosts = [
                    ...response.pending_posts.map(post => mapApiPostToComponentPost(post, 'review')),
                    ...response.rejected_posts.map(post => mapApiPostToComponentPost(post, 'revision')),
                    ...response.unpublished_posts.map(post => mapApiPostToComponentPost(post, 'private')),
                    ...response.approved_posts.map(post => mapApiPostToComponentPost(post, 'published')),
                    ...response.deleted_posts.map(post => mapApiPostToComponentPost(post, 'deleted'))
                ];
                setPosts(allPosts);
            }
            catch (error) {
                console.error('Failed to fetch posts:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    const navigationItems = [
        { id: 'review', label: '審査中', count: statusCounts.review, isActive: activeStatus === 'review' },
        { id: 'revision', label: '要修正', count: statusCounts.revision, isActive: activeStatus === 'revision' },
        { id: 'private', label: '非公開', count: statusCounts.private, isActive: activeStatus === 'private' },
        { id: 'published', label: '公開済み', count: statusCounts.published, isActive: activeStatus === 'published' },
        { id: 'deleted', label: '削除', count: statusCounts.deleted, isActive: activeStatus === 'deleted' }
    ];
    const handleStatusClick = (statusId) => {
        setActiveStatus(statusId);
    };
    const filteredPosts = posts.filter(post => post.status === activeStatus);
    if (loading) {
        return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u6295\u7A3F\u306E\u7BA1\u7406", showBackButton: true }), _jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("p", { className: "text-gray-500", children: "\u8AAD\u307F\u8FBC\u307F\u4E2D..." }) })] }));
    }
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u6295\u7A3F\u306E\u7BA1\u7406", showBackButton: true }), _jsx(AccountNavigation, { items: navigationItems, onItemClick: handleStatusClick }), _jsx("div", { className: "p-1 mt-10", children: _jsx(PostContentSection, { posts: filteredPosts, activeStatus: activeStatus, statusLabels: statusLabels }) })] }));
}
