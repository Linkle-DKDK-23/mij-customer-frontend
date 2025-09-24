import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
export default function FilterTabs({ tabs, onTabClick, className = "" }) {
    return (_jsx("div", { className: `flex space-x-2 ${className}`, children: tabs.map((tab) => (_jsx(Button, { variant: tab.isActive ? "default" : "outline", size: "sm", onClick: () => onTabClick(tab.id), className: `${tab.isActive
                ? "bg-primary text-white hover:bg-primary/90"
                : "text-gray-600 hover:text-primary border-gray-300"}`, children: tab.label }, tab.id))) }));
}
