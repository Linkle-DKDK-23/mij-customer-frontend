import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
export default function ProgressBar({ currentStep, totalSteps, steps, className }) {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    return (_jsx("div", { className: cn("w-full bg-white border-b border-gray-200 py-4", className), children: _jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [_jsx("div", { className: "relative mb-4", children: _jsx("div", { className: "h-2 bg-gray-200 rounded-full", children: _jsx("div", { className: "h-2 bg-primary rounded-full transition-all duration-300 ease-in-out", style: { width: `${Math.max(0, Math.min(100, progressPercentage))}%` } }) }) }), _jsx("div", { className: "flex justify-between", children: steps.map((step) => (_jsx("div", { className: "flex flex-col items-center", children: _jsx("div", { className: cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2", step.completed
                                ? "bg-primary text-white"
                                : step.current
                                    ? "bg-primary text-white"
                                    : "bg-gray-300 text-gray-600"), children: step.completed ? "✓" : step.id }) }, step.id))) })] }) }));
}
