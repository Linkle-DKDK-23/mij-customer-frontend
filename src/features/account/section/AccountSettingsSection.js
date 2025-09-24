import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Settings, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function AccountSettingsSection() {
    const navigate = useNavigate();
    return (_jsx("div", { className: "px-6 mb-6", onClick: () => navigate('/account/settings'), children: _jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Settings, { className: "h-5 w-5 text-gray-600" }), _jsx("span", { className: "text-gray-900", children: "\u30A2\u30AB\u30A6\u30F3\u30C8\u8A2D\u5B9A" })] }), _jsx(ChevronRight, { className: "h-5 w-5 text-gray-400" })] }) }));
}
