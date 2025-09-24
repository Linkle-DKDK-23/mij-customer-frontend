import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export default function PostContentSection({ posts, activeStatus, statusLabels }) {
    if (posts.length === 0) {
        return (_jsx("div", { className: "text-center py-12", children: _jsxs("p", { className: "text-gray-500", children: [statusLabels[activeStatus], "\u306E\u6295\u7A3F\u306F\u3042\u308A\u307E\u305B\u3093"] }) }));
    }
    return (_jsx("div", { className: "grid grid-cols-3 gap-1", children: posts.map((post) => (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: post.thumbnail, alt: post.title, className: "w-full h-40 object-cover" }), post.price && (_jsxs("div", { className: "absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded", children: ["\u00A5", post.price.toLocaleString()] })), _jsx("div", { className: "absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded", children: statusLabels[post.status] })] }), _jsx("div", { className: "p-3", children: _jsx("h3", { className: "text-sm font-medium text-gray-900 line-clamp-2", children: post.title }) })] }, post.id))) }));
}
