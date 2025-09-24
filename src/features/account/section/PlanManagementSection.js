import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
export default function PlanManagementSection({ accountInfo }) {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-medium text-gray-900 mb-2", children: "\u30D7\u30E9\u30F3\u7BA1\u7406" }), _jsxs("div", { className: "flex justify-center space-x-8 mb-4", children: [_jsx("div", { className: "text-center", children: _jsxs("div", { className: "text-2xl font-bold text-gray-900", children: [accountInfo?.plan_count || 0, "\u4EF6"] }) }), _jsx("div", { className: "text-center", children: _jsxs("div", { className: "text-2xl font-bold text-gray-900", children: [accountInfo?.total_plan_price || 0, "\u5186"] }) })] }), _jsx("div", { className: "space-y-2", children: _jsx("button", { className: "w-full text-pink-500 text-sm text-center", onClick: () => navigate('/account/plan'), children: "\u5168\u3066\u898B\u308B >" }) })] }));
}
