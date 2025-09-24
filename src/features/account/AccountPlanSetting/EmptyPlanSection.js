import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
export default function EmptyPlanSection({ onCreatePlan }) {
    return (_jsx("div", { className: "text-center py-12", children: _jsxs("div", { className: "bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8", children: [_jsx(Plus, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "\u30D7\u30E9\u30F3\u3092\u4F5C\u6210\u3057\u307E\u3057\u3087\u3046" }), _jsx("p", { className: "text-gray-600 mb-4", children: "\u30D7\u30E9\u30F3\u3092\u4F5C\u6210\u3057\u3066\u3001\u30D5\u30A1\u30F3\u306B\u5B9A\u671F\u7684\u306A\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u63D0\u4F9B\u3057\u307E\u3057\u3087\u3046" }), _jsx(Button, { onClick: onCreatePlan, className: "bg-primary hover:bg-primary/90", children: "\u30D7\u30E9\u30F3\u3092\u4F5C\u6210\u3059\u308B" })] }) }));
}
