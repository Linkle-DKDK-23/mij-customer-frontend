import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function AccountHeader({ title, showBackButton = false, showActions = false }) {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 w-full", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [showBackButton && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => navigate('/account'), children: _jsx(ArrowLeft, { className: "h-5 w-5" }) })), _jsx("h1", { className: "text-xl font-semibold text-gray-900", children: title })] }), showActions && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Share, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(MessageCircle, { className: "h-5 w-5" }) })] }))] }));
}
