import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostGrid from './PostGrid';
export default function PostsSection({ title, posts, showMoreButton = true, onMoreClick, showRank = false, columns = 2, className = '', onPostClick, onCreatorClick }) {
    return (_jsx("section", { className: `bg-white py-6 border-t border-gray-200 ${className}`, children: _jsxs("div", { className: "max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900", children: title }), showMoreButton && (_jsxs(Button, { variant: "ghost", size: "sm", className: "text-primary hover:text-primary", onClick: onMoreClick, children: ["\u3082\u3063\u3068\u898B\u308B", _jsx(ChevronRight, { className: "h-4 w-4 ml-1" })] }))] }), _jsx(PostGrid, { posts: posts, showRank: showRank, columns: columns, onPostClick: onPostClick, onCreatorClick: onCreatorClick, className: "gap-1" })] }) }));
}
