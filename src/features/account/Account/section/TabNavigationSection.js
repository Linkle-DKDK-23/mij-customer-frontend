import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
export default function TabNavigationSection({ items, onItemClick }) {
    return (_jsx("div", { className: "bg-white border-b border-gray-200", children: _jsx("div", { className: "flex space-x-1", children: items.map((item) => (_jsxs(Button, { variant: item.isActive ? "default" : "ghost", className: "flex-1 flex-col h-16 items-center justify-center", onClick: () => onItemClick(item.id), children: [_jsx("span", { className: "text-xs", children: item.label }), _jsx("span", { className: "text-sm font-medium", children: item.count })] }, item.id))) }) }));
}
