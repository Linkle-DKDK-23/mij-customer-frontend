import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
export default function PlanHeaderSection({ onCreatePlan }) {
    return (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "\u30D7\u30E9\u30F3\u4E00\u89A7" }), _jsxs(Button, { onClick: onCreatePlan, className: "bg-primary hover:bg-primary/90", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "\u65B0\u3057\u3044\u30D7\u30E9\u30F3\u3092\u4F5C\u6210"] })] }));
}
