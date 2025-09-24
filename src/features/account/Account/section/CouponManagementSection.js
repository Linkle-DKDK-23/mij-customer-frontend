import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
export default function CouponManagementSection() {
    return (_jsx("div", { className: "bg-white border-b border-gray-200 py-4", children: _jsxs(Button, { variant: "ghost", className: "w-full justify-start text-left", children: [_jsx(Gift, { className: "h-5 w-5 mr-3" }), "\u30AF\u30FC\u30DD\u30F3\u7BA1\u7406"] }) }));
}
