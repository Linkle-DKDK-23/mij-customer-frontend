import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Clock, Eye, Heart, Bookmark, Star, Play, Crown } from 'lucide-react';
export default function RankingCard({ post, className = "" }) {
    const getRankIcon = (rank) => {
        if (rank <= 3) {
            return _jsx(Crown, { className: "h-4 w-4 text-yellow-500" });
        }
        return null;
    };
    const getRankBadgeColor = (rank) => {
        if (rank === 1)
            return "bg-yellow-500";
        if (rank === 2)
            return "bg-gray-400";
        if (rank === 3)
            return "bg-amber-600";
        return "bg-primary";
    };
    return (_jsxs("div", { className: `bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${className}`, children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: post.thumbnail, alt: post.title, className: "w-full aspect-video object-cover" }), _jsxs("div", { className: "absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), post.duration] }), post.rank && (_jsx("div", { className: `absolute top-2 left-2 ${getRankBadgeColor(post.rank)} text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center`, children: post.rank })), _jsx("div", { className: "absolute top-2 right-2", children: post.rank && getRankIcon(post.rank) }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30", children: _jsx(Play, { className: "h-12 w-12 text-white" }) })] }), _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "font-medium text-gray-900 text-sm line-clamp-2 mb-2", children: post.title }), _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("img", { src: post.creator.avatar, alt: post.creator.name, className: "w-6 h-6 rounded-full" }), _jsxs("span", { className: "text-xs text-gray-600 flex items-center", children: [post.creator.name, post.creator.verified && _jsx(Star, { className: "h-3 w-3 text-yellow-500 ml-1" })] })] }), _jsx("div", { className: "flex items-center justify-between text-xs text-gray-500", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Eye, { className: "h-3 w-3 mr-1" }), post.views.toLocaleString()] }), _jsxs("span", { className: "flex items-center", children: [_jsx(Heart, { className: "h-3 w-3 mr-1" }), post.likes.toLocaleString()] }), post.bookmarks && (_jsxs("span", { className: "flex items-center", children: [_jsx(Bookmark, { className: "h-3 w-3 mr-1" }), post.bookmarks.toLocaleString()] }))] }) })] })] }));
}
