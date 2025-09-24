import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { toggleFollow, getFollowStatus } from '@/api/endpoints/social';
import { Button } from '@/components/ui/button';
export default function FollowButton({ userId, initialFollowing = false, className = "" }) {
    const [following, setFollowing] = useState(initialFollowing);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // 初期状態を取得
        const fetchFollowStatus = async () => {
            try {
                const response = await getFollowStatus(userId);
                setFollowing(response.data.following);
            }
            catch (error) {
                console.error('Failed to fetch follow status:', error);
            }
        };
        fetchFollowStatus();
    }, [userId]);
    const handleToggleFollow = async () => {
        if (loading)
            return;
        setLoading(true);
        try {
            const response = await toggleFollow(userId);
            setFollowing(response.data.following || false);
            console.log(response.data.following);
        }
        catch (error) {
            console.error('Failed to toggle follow:', error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(Button, { onClick: handleToggleFollow, disabled: loading, className: `w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2
         ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`, children: following ? (_jsx(_Fragment, { children: _jsx("span", { className: "text-sm font-medium", children: "\u30D5\u30A9\u30ED\u30FC\u4E2D" }) })) : (_jsx(_Fragment, { children: _jsx("span", { className: "text-sm font-medium", children: "\u30D5\u30A9\u30ED\u30FC" }) })) }));
}
