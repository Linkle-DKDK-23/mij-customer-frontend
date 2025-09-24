import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AuthLayout from './AuthLayout';
import ProgressBar from '@/components/ui/progress-bar';
export default function VerificationLayout({ children, currentStep, totalSteps, steps }) {
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(ProgressBar, { currentStep: currentStep, totalSteps: totalSteps, steps: steps }), _jsx(AuthLayout, { children: children })] }));
}
