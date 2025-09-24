import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
export default function SalesSection({ accountInfo }) {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-medium text-gray-900 mb-2", children: "\u58F2\u4E0A\u91D1" }), _jsx("div", { className: "text-center mb-4", children: _jsxs("div", { className: "text-2xl font-bold text-gray-900", children: [accountInfo?.total_sales || 0, "\u5186"] }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("button", { className: "w-full text-pink-500 text-sm text-center", onClick: () => navigate('/account/sale'), children: "\u58F2\u4E0A\u91D1\u306E\u8A73\u7D30 >" }), _jsx("button", { className: "w-full text-pink-500 text-sm text-center", onClick: () => navigate('/account/sale-withdraw'), children: "\u51FA\u91D1\u7533\u8ACB >" })] })] }));
}
