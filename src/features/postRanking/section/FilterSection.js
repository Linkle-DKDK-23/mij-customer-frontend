import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FilterTabs from '@/components/video/FilterTabs';
export default function FilterSection({ tabItems, timePeriodTabs, onTabClick, onTimePeriodClick }) {
    return (_jsx("section", { className: "bg-white border-b border-gray-200", children: _jsxs("div", { className: "max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4", children: [_jsx(FilterTabs, { tabs: tabItems, onTabClick: onTabClick, className: "justify-center mb-4" }), _jsx(FilterTabs, { tabs: timePeriodTabs, onTabClick: onTimePeriodClick, className: "justify-center" })] }) }));
}
