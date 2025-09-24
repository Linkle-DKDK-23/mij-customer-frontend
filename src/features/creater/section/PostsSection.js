import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Play, Clock } from 'lucide-react';
export default function PostsSection({ posts }) {
    // 投稿が3つ並びで表示する
    // スマホレイアウトで表示
    return (_jsx("div", { className: "grid grid-cols-3 gap-1", children: posts.map((post) => (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: post.thumbnail, alt: post.title, className: "w-full aspect-square object-cover" }), post.isVideo && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(Play, { className: "h-12 w-12 text-white opacity-80" }) })), _jsxs("div", { className: "absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), post.duration] }), _jsxs("div", { className: "absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded", children: ["\u00A5", post.price.toLocaleString()] })] }), _jsxs("div", { className: "p-3", children: [_jsx("p", { className: "text-xs text-gray-500 mb-1", children: post.date }), _jsx("h3", { className: "text-sm font-medium text-gray-900 line-clamp-2", children: post.title })] })] }, post.id))) }));
}
