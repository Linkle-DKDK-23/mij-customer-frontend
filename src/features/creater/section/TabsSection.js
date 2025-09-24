import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export default function TabsSection({ activeTab, setActiveTab, tabs }) {
    return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "flex space-x-8 justify-around", children: tabs.map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`, children: [tab.label, " ", tab.count] }, tab.id))) }) }));
}
