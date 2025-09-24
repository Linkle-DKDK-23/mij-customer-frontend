import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function AccountLayout({ children, title }) {
    return (_jsx("div", { className: "min-h-screen bg-white", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [title && (_jsx("div", { className: "mb-6", children: _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: title }) })), _jsx("div", { className: "bg-white rounded-lg shadow-sm", children: children })] }) }));
}
