import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Share, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function ProfileHeaderSection({ coverUrl, avatarUrl, displayName }) {
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "h-32 bg-gradient-to-r from-blue-400 to-purple-500", style: {
                    backgroundImage: coverUrl ? `${coverUrl}` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                } }), _jsx("div", { className: "absolute -bottom-10 left-6", children: _jsx("img", { src: avatarUrl || '/src/assets/no-image.svg', alt: displayName, className: "w-20 h-20 rounded-full border-4 border-white object-cover" }) }), _jsxs("div", { className: "absolute top-4 right-4 flex space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "bg-white/20 text-white hover:bg-white/30", children: _jsx(Share, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "bg-white/20 text-white hover:bg-white/30", children: _jsx(MessageCircle, { className: "h-4 w-4" }) })] })] }));
}
