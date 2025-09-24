import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function RecommendedGenresSection({ genres }) {
    const navigate = useNavigate();
    const handleGenreClick = (slug) => {
        navigate(`/category?slug=${slug}`);
    };
    return (_jsx("section", { className: "bg-white py-6", children: _jsxs("div", { className: "max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900", children: "\u304A\u3059\u3059\u3081\u30B8\u30E3\u30F3\u30EB" }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-primary hover:text-pink-600", children: ["\u3082\u3063\u3068\u898B\u308B", _jsx(ChevronRight, { className: "h-4 w-4 ml-1" })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: genres.map((genre) => (_jsxs("div", { className: "bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors", onClick: () => handleGenreClick(genre.slug), children: [_jsx("h3", { className: "font-medium text-gray-900 text-sm", children: genre.name }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [genre.postCount.toLocaleString(), " posts"] })] }, genre.id))) })] }) }));
}
