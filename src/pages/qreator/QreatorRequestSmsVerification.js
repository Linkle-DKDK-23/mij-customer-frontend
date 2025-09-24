import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, CheckCircle } from 'lucide-react';
import VerificationLayout from '@/features/auth/VerificationLayout';
export default function QreatorRequestSmsVerification({ onNext, onBack, currentStep, totalSteps, steps }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const handleSendCode = () => {
        if (!phoneNumber) {
            alert('電話番号を入力してください');
            return;
        }
        setIsCodeSent(true);
        console.log('SMS verification code sent to:', phoneNumber);
    };
    const handleVerifyCode = () => {
        if (!verificationCode) {
            alert('認証コードを入力してください');
            return;
        }
        setIsVerified(true);
        console.log('SMS verification completed');
    };
    const handleNext = () => {
        if (!isVerified) {
            alert('SMS認証を完了してください');
            return;
        }
        onNext();
    };
    return (_jsx(VerificationLayout, { currentStep: currentStep, totalSteps: totalSteps, steps: steps, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary rounded-full", children: _jsx(Phone, { className: "h-8 w-8 text-white" }) }), _jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "SMS\u8A8D\u8A3C" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u96FB\u8A71\u756A\u53F7\u306B\u3088\u308B\u672C\u4EBA\u78BA\u8A8D\u3092\u884C\u3044\u307E\u3059" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 mb-2", children: "\u96FB\u8A71\u756A\u53F7" }), _jsx("input", { type: "tel", id: "phone", value: phoneNumber, onChange: (e) => setPhoneNumber(e.target.value), placeholder: "090-1234-5678", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent", disabled: isCodeSent })] }), !isCodeSent && (_jsx(Button, { onClick: handleSendCode, className: "w-full bg-primary hover:bg-primary/90 text-white", children: "\u8A8D\u8A3C\u30B3\u30FC\u30C9\u3092\u9001\u4FE1" })), isCodeSent && !isVerified && (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: _jsxs("p", { className: "text-sm text-blue-800", children: [phoneNumber, " \u306B\u8A8D\u8A3C\u30B3\u30FC\u30C9\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002 \u53D7\u4FE1\u3057\u305F\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"] }) }), _jsxs("div", { children: [_jsx("label", { htmlFor: "code", className: "block text-sm font-medium text-gray-700 mb-2", children: "\u8A8D\u8A3C\u30B3\u30FC\u30C9" }), _jsx("input", { type: "text", id: "code", value: verificationCode, onChange: (e) => setVerificationCode(e.target.value), placeholder: "123456", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" })] }), _jsx(Button, { onClick: handleVerifyCode, className: "w-full bg-primary hover:bg-primary/90 text-white", children: "\u8A8D\u8A3C\u30B3\u30FC\u30C9\u3092\u78BA\u8A8D" })] })), isVerified && (_jsx("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-500 mr-2" }), _jsx("p", { className: "text-sm text-green-800", children: "SMS\u8A8D\u8A3C\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F" })] }) }))] }), _jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-yellow-900 mb-2", children: "SMS\u8A8D\u8A3C\u306B\u3064\u3044\u3066" }), _jsxs("ul", { className: "text-sm text-yellow-800 space-y-1", children: [_jsx("li", { children: "\u2022 \u8A8D\u8A3C\u30B3\u30FC\u30C9\u306E\u6709\u52B9\u671F\u9650\u306F5\u5206\u9593\u3067\u3059" }), _jsx("li", { children: "\u2022 SMS\u304C\u5C4A\u304B\u306A\u3044\u5834\u5408\u306F\u3001\u8FF7\u60D1\u30E1\u30FC\u30EB\u30D5\u30A9\u30EB\u30C0\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044" }), _jsx("li", { children: "\u2022 \u6D77\u5916\u306E\u96FB\u8A71\u756A\u53F7\u306B\u306F\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093" })] })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { onClick: onBack, variant: "outline", className: "flex-1", children: "\u623B\u308B" }), _jsx(Button, { onClick: handleNext, disabled: !isVerified, className: "flex-1 bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300", children: "\u6B21\u3078" })] })] }) }));
}
