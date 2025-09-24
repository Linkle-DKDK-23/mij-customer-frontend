import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Play, Clock, Crown } from 'lucide-react';
import LikeButton from '@/components/social/LikeButton';
import BookmarkButton from '@/components/social/BookmarkButton';
export default function PostCard({ id, title, thumbnail, duration = '00:00', views = 0, likes = 0, creator, rank, showRank = false, onClick, onCreatorClick }) {
    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    };
    const handleCreatorClick = (e) => {
        e.stopPropagation();
        if (onCreatorClick) {
            onCreatorClick(creator.display_name);
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow", children: [_jsxs("div", { className: "relative", onClick: handleClick, children: [_jsx("img", { src: thumbnail, alt: title, className: "w-full aspect-square object-cover" }), showRank && rank && (_jsxs("div", { className: "absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded flex items-center", children: [rank === 1 && _jsx(Crown, { className: "h-3 w-3 mr-1" }), "#", rank] })), _jsxs("div", { className: "absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), duration] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30", children: _jsx(Play, { className: "h-12 w-12 text-white" }) })] }), _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "font-medium text-gray-900 text-sm line-clamp-2 mb-2", children: title }), _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("img", { src: creator.avatar, alt: creator.name, className: "w-6 h-6 rounded-full cursor-pointer", onClick: handleCreatorClick }), _jsxs("span", { className: "text-xs text-gray-600 flex items-center cursor-pointer", onClick: handleCreatorClick, children: [creator.name, creator.verified && _jsx("span", { className: "text-yellow-500 ml-1", children: "\u2605" })] })] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [_jsx("div", { className: "flex items-center space-x-3", children: _jsx("span", { className: "flex items-center", children: _jsx(LikeButton, { postId: id }) }) }), _jsx(BookmarkButton, { postId: id, className: "h-6 px-2" })] })] })] }));
}
