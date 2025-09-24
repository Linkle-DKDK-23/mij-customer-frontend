import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function WithdrawalHistorySection({ withdrawalHistory }) {
    return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg", children: [_jsx("div", { className: "p-6 border-b border-gray-200", children: _jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "\u904E\u53BB\u5C65\u6B74" }) }), _jsx("div", { className: "p-6", children: withdrawalHistory.length === 0 ? (_jsx("div", { className: "text-center py-8 text-gray-500", children: "\u5C65\u6B74\u304C\u3042\u308A\u307E\u305B\u3093" })) : (_jsx("div", { className: "space-y-3", children: withdrawalHistory.map((history) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: history.date }), _jsxs("div", { className: "font-medium text-gray-900", children: ["\u00A5", history.amount.toLocaleString()] })] }), _jsx("span", { className: `text-xs px-2 py-1 rounded ${history.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : history.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'}`, children: history.status === 'completed' ? '完了' :
                                    history.status === 'pending' ? '処理中' : '失敗' })] }, history.id))) })) })] }));
}
