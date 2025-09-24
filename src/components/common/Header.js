import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Search, Bell, Menu } from 'lucide-react';
export default function Header() {
    return (_jsx("header", { className: "fixed top-0 left-0  right-0 bg-white shadow-sm border-b border-gray-200 z-40", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx("div", { className: "flex items-center", children: _jsx("div", { className: "text-2xl font-bold text-primary", children: "MIJ" }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Search, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Bell, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Menu, { className: "h-5 w-5" }) })] })] }) }) }));
}
