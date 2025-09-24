import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Edit, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function ProfileSection({ profile }) {
    const navigate = useNavigate();
    return (_jsx("div", { className: "bg-white border-b border-gray-200 py-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("img", { src: profile.avatar, alt: profile.name, className: "w-16 h-16 rounded-full object-cover" }), _jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: profile.name }), _jsxs("p", { className: "text-gray-600", children: ["@", profile.username] }), _jsxs("div", { className: "flex items-center space-x-4 mt-2 text-sm text-gray-500", children: [_jsxs("span", { children: [profile.followingCount, "\u30D5\u30A9\u30ED\u30FC\u4E2D"] }), _jsxs("span", { children: [profile.followerCount, "\u30D5\u30A9\u30ED\u30EF\u30FC"] }), _jsxs("span", { children: [profile.totalLikes, "\u3044\u3044\u306D"] })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => navigate('/account/edit'), children: [_jsx(Edit, { className: "h-4 w-4 mr-2" }), "\u7DE8\u96C6"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => navigate('/account/settings'), children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "\u8A2D\u5B9A"] })] })] }) }));
}
