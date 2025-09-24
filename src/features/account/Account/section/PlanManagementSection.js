import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function PlanManagementSection() {
    const navigate = useNavigate();
    return (_jsx("div", { className: "bg-white border-b border-gray-200 py-4", children: _jsxs(Button, { variant: "ghost", className: "w-full justify-start text-left", onClick: () => navigate('/account/plan-setting'), children: [_jsx(Calendar, { className: "h-5 w-5 mr-3" }), "\u30D7\u30E9\u30F3\u7BA1\u7406"] }) }));
}
