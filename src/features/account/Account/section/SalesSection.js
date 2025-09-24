import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function SalesSection() {
    const navigate = useNavigate();
    return (_jsx("div", { className: "bg-white border-b border-gray-200 py-4", children: _jsxs(Button, { variant: "ghost", className: "w-full justify-start text-left", onClick: () => navigate('/account/sale'), children: [_jsx(DollarSign, { className: "h-5 w-5 mr-3" }), "\u58F2\u4E0A\u91D1"] }) }));
}
