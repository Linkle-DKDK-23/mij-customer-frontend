import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FollowButton from '@/components/social/FollowButton';
export default function CreatorsSection({ title, creators, showRank = false, onCreatorClick }) {
    const navigate = useNavigate();
    const handleCreatorClick = (display_name) => {
        if (onCreatorClick) {
            onCreatorClick(display_name);
        }
        else {
            navigate(`/account/profile?display_name=${display_name}`);
        }
    };
    return (_jsx("section", { className: "bg-white py-6 border-t border-gray-200", children: _jsxs("div", { className: "max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900", children: title }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-primary hover:text-pink-600", children: ["\u3082\u3063\u3068\u898B\u308B", _jsx(ChevronRight, { className: "h-4 w-4 ml-1" })] })] }), _jsx("div", { className: "flex overflow-x-auto space-x-4 pb-2 scrollbar-hide", children: creators.map((creator) => (_jsx("div", { className: "min-w-[240px] bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex-shrink-0", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { onClick: () => handleCreatorClick(creator.display_name), children: [_jsxs("div", { className: "relative inline-block mb-3", children: [_jsx("img", { src: creator.avatar, alt: creator.name, className: "w-24 h-24 rounded-full mx-auto" }), showRank && creator.rank && (_jsx("div", { className: "absolute -top-1 -left-1 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center", children: creator.rank }))] }), _jsxs("h3", { className: "font-medium text-gray-900 text-sm mb-1 flex items-center justify-center", children: [creator.name, creator.verified && _jsx(Star, { className: "h-3 w-3 text-yellow-500 ml-1" })] }), _jsxs("p", { className: "text-xs text-gray-500 mb-3", children: [creator.followers.toLocaleString(), " followers"] })] }), _jsx(FollowButton, { userId: creator.id })] }) }, creator.id))) })] }) }));
}
