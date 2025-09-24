import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function LoadingSpinner({ size = 'md', message = '読み込み中...', className = '' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };
    return (_jsxs("div", { className: `flex flex-col items-center justify-center space-y-2 ${className}`, children: [_jsx("div", { className: `animate-spin rounded-full border-2 border-gray-300 border-t-primary ${sizeClasses[size]}` }), message && (_jsx("p", { className: "text-sm text-gray-600", children: message }))] }));
}
