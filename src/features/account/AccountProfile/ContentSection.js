import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
const NO_IMAGE_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwTDEwMCAxMDBaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTRBRiIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
export default function ContentSection({ activeTab, posts, plans, individualPurchases, gachaItems }) {
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    const renderEmptyState = (type) => (_jsxs("div", { className: "p-6 text-center text-gray-500", children: [type, "\u306F\u3042\u308A\u307E\u305B\u3093\u3002"] }));
    const renderContent = () => {
        switch (activeTab) {
            case 'posts':
                return posts.length > 0 ? (_jsx("div", { className: "grid grid-cols-3 gap-1 p-1 pb-24", children: posts.map((post) => (_jsx("div", { className: "bg-white border border-gray-200 rounded-lg overflow-hidden", children: _jsxs("div", { className: "relative", children: [_jsx("img", { src: post.thumbnail_url || NO_IMAGE_URL, alt: post.description || '投稿画像', className: "w-full aspect-square object-cover", onError: (e) => {
                                        e.currentTarget.src = NO_IMAGE_URL;
                                    } }), post.video_duration && (_jsx("div", { className: "absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded", children: formatDuration(post.video_duration) })), _jsxs("div", { className: "absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center gap-1", children: [_jsx(Heart, { className: "w-4 h-4" }), _jsx("span", { children: post.likes_count })] })] }) }, post.id))) })) : renderEmptyState('投稿');
            case 'plans':
                return plans.length > 0 ? (_jsx("div", { className: "p-6 space-y-4", children: plans.map((plan) => (_jsx("div", { className: "border border-gray-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-gray-900", children: plan.name }), plan.description && _jsx("p", { className: "text-sm text-gray-600", children: plan.description })] }), _jsx(Button, { className: "bg-primary hover:bg-primary/90", children: "\u52A0\u5165" })] }) }, plan.id))) })) : renderEmptyState('プラン');
            case 'individual':
                return individualPurchases.length > 0 ? (_jsx("div", { className: "grid grid-cols-3 gap-1 p-1 pb-24", children: individualPurchases.map((post) => (_jsx("div", { className: "bg-white border border-gray-200 rounded-lg overflow-hidden", children: _jsxs("div", { className: "relative", children: [_jsx("img", { src: post.thumbnail_url || NO_IMAGE_URL, alt: post.description || '投稿画像', className: "w-full aspect-square object-cover", onError: (e) => {
                                        e.currentTarget.src = NO_IMAGE_URL;
                                    } }), post.video_duration && (_jsx("div", { className: "absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded", children: formatDuration(post.video_duration) })), _jsxs("div", { className: "absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center gap-1", children: [_jsx(Heart, { className: "w-4 h-4" }), _jsx("span", { children: post.likes_count })] })] }) }, post.id))) })) : renderEmptyState('単品購入');
            case 'gacha':
                return gachaItems.length > 0 ? (_jsx("div", { className: "p-6 space-y-4", children: gachaItems.map((item) => (_jsx("div", { className: "border border-gray-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: NO_IMAGE_URL, alt: "\u30AC\u30C1\u30E3\u30A2\u30A4\u30C6\u30E0", className: "w-20 h-16 object-cover rounded" }), _jsx(Star, { className: "absolute top-1 left-1 h-4 w-4 text-yellow-400 fill-current" })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-gray-900", children: "\u30AC\u30C1\u30E3\u30A2\u30A4\u30C6\u30E0" }), _jsxs("div", { className: "flex items-center space-x-4 mt-1", children: [_jsxs("span", { className: "text-sm font-medium text-primary", children: ["\u00A5", item.amount.toLocaleString()] }), _jsx("span", { className: "text-sm text-gray-600", children: new Date(item.created_at).toLocaleDateString() })] })] })] }) }, item.id))) })) : renderEmptyState('ガチャ');
            default:
                return null;
        }
    };
    return renderContent();
}
