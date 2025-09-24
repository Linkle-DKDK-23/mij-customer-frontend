import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, X } from 'lucide-react';
export default function ErrorMessage({ message, onClose, className = '', variant = 'error' }) {
    const variantClasses = {
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800'
    };
    const iconColors = {
        error: 'text-red-500',
        warning: 'text-yellow-500',
        info: 'text-blue-500',
        success: 'text-green-500'
    };
    return (_jsx("div", { className: `border rounded-lg p-4 ${variantClasses[variant]} ${className}`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(AlertCircle, { className: `w-5 h-5 mt-0.5 ${iconColors[variant]}` }), _jsx("p", { className: "text-sm", children: message })] }), onClose && (_jsx("button", { onClick: onClose, className: `ml-2 ${iconColors[variant]} hover:opacity-75`, children: _jsx(X, { className: "w-4 h-4" }) }))] }) }));
}
