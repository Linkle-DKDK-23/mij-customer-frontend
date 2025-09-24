import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from 'lucide-react';
export default function BankAccountSection({ bankAccount }) {
    return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "\u632F\u8FBC\u5148" }), _jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-900", children: bankAccount.bankName }), _jsx("div", { className: "text-sm text-gray-600", children: bankAccount.branchName }), _jsxs("div", { className: "text-sm text-gray-600", children: ["\u666E\u901A ", bankAccount.accountNumber, " \u30E9\u30A4\u30AF\u30CD\u30C3\u30C8"] })] }), _jsx(ChevronRight, { className: "h-5 w-5 text-gray-400" })] })] }));
}
