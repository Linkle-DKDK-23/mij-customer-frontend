import { jsx as _jsx } from "react/jsx-runtime";
export default function AuthLayout({ children, title }) {
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center px-4 bg-white", children: _jsx("div", { className: "max-w-md w-full space-y-8", children: _jsx("div", { className: "bg-white rounded-lg p-8", children: children }) }) }));
}
