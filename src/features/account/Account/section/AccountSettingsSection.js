import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function AccountSettingsSection() {
    const navigate = useNavigate();
    return (_jsx("div", { className: "bg-white border-b border-gray-200 py-4", children: _jsxs(Button, { variant: "ghost", className: "w-full justify-start text-left", onClick: () => navigate('/account/settings'), children: [_jsx(Settings, { className: "h-5 w-5 mr-3" }), "\u30A2\u30AB\u30A6\u30F3\u30C8\u8A2D\u5B9A"] }) }));
}
