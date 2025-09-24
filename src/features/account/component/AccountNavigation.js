import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
export default function AccountNavigation({ items, onItemClick }) {
    return (_jsx("div", { className: "flex border-b border-gray-200 w-full justify-center", children: items.map((item) => (_jsxs(Button, { variant: "ghost", className: `flex-1 flex-col items-center justify-center rounded-none border-b-2 h-16 ${item.isActive
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-gray-600 hover:text-gray-900'}`, onClick: () => onItemClick(item.id), children: [_jsx("span", { className: "text-xs", children: item.label }), item.count !== undefined && (_jsx("span", { className: "text-sm font-medium", children: item.count }))] }, item.id))) }));
}
