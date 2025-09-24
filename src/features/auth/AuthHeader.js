import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function AuthHeader({ title, showBackButton = false, onBack }) {
    return (_jsxs("div", { className: "flex items-center justify-between mb-6", children: [showBackButton ? (_jsx(Button, { variant: "ghost", onClick: onBack, className: "p-2", children: _jsx(ArrowLeft, { className: "h-5 w-5" }) })) : (_jsx("div", {})), _jsx("h1", { className: "text-lg font-semibold text-gray-900", children: title }), _jsx("div", {})] }));
}
