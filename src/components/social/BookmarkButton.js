import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { toggleBookmark, getBookmarkStatus } from '@/api/endpoints/social';
export default function BookmarkButton({ postId, initialBookmarked = false, className = "" }) {
    const [bookmarked, setBookmarked] = useState(initialBookmarked);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // 初期状態を取得
        const fetchBookmarkStatus = async () => {
            try {
                const response = await getBookmarkStatus(postId);
                setBookmarked(response.data.bookmarked);
            }
            catch (error) {
                console.error('Failed to fetch bookmark status:', error);
            }
        };
        fetchBookmarkStatus();
    }, [postId]);
    const handleToggleBookmark = async () => {
        if (loading)
            return;
        setLoading(true);
        try {
            const response = await toggleBookmark(postId);
            setBookmarked(response.data.bookmarked || false);
        }
        catch (error) {
            console.error('Failed to toggle bookmark:', error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("button", { onClick: handleToggleBookmark, disabled: loading, className: `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${bookmarked
            ? 'text-yellow-600'
            : 'text-gray-500'} ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`, children: _jsx(Bookmark, { className: `h-5 w-5 ${bookmarked ? 'fill-current' : ''}` }) }));
}
