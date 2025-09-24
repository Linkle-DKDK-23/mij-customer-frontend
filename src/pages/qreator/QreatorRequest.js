import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, FileText, CreditCard, User } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import QreatorRequestSmsVerification from './QreatorRequestSmsVerification';
import QreatorRequestPersonalInfo from './QreatorRequestPersonalInfo';
import QreatorRequestCertifierImage from './QreatorRequestCertifierImage';
import QreatorRequestPlanSetup from './QreatorRequestPlanSetup';
export default function QreatorRequest() {
    const [currentStep, setCurrentStep] = useState(0);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [personalInfo, setPersonalInfo] = useState(null);
    const [planData, setPlanData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const steps = [
        {
            id: 1,
            title: 'SMS認証',
            description: '電話番号による本人確認',
            icon: _jsx(Phone, { className: "h-6 w-6" }),
            completed: currentStep > 1,
            current: currentStep === 1
        },
        {
            id: 2,
            title: '個人情報入力',
            description: '基本情報の入力',
            icon: _jsx(User, { className: "h-6 w-6" }),
            completed: currentStep > 2,
            current: currentStep === 2
        },
        {
            id: 3,
            title: '身分証明書確認',
            description: '身分証明書のアップロード',
            icon: _jsx(FileText, { className: "h-6 w-6" }),
            completed: currentStep > 3,
            current: currentStep === 3
        },
        {
            id: 4,
            title: 'プラン登録',
            description: 'クリエイタープランの設定',
            icon: _jsx(CreditCard, { className: "h-6 w-6" }),
            completed: currentStep > 4,
            current: currentStep === 4
        },
        {
            id: 5,
            title: '完了',
            description: 'クリエイター申請が完了しました',
            icon: _jsx(CheckCircle, { className: "h-6 w-6" }),
            completed: currentStep > 5,
            current: currentStep === 5
        }
    ];
    const handleStartApplication = () => {
        if (!agreedToTerms) {
            alert('利用規約に同意してください');
            return;
        }
        setCurrentStep(1);
    };
    const handleSmsVerificationNext = () => {
        setCurrentStep(2);
    };
    const handlePersonalInfoNext = () => {
        setCurrentStep(3);
    };
    const handleDocumentVerificationNext = () => {
        setCurrentStep(4);
    };
    const handlePlanSetupNext = async (data) => {
        setPlanData(data);
        if (!personalInfo) {
            alert('個人情報が入力されていません');
            return;
        }
        setIsSubmitting(true);
        try {
            setCurrentStep(5);
        }
        catch (error) {
            console.error('Creator registration error:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    if (currentStep === 1) {
        return (_jsx(QreatorRequestSmsVerification, { onNext: handleSmsVerificationNext, onBack: handleBack, currentStep: currentStep, totalSteps: 4, steps: steps }));
    }
    if (currentStep === 2) {
        return (_jsx(QreatorRequestPersonalInfo, { onNext: handlePersonalInfoNext, onBack: handleBack, currentStep: currentStep, totalSteps: 4, steps: steps }));
    }
    if (currentStep === 3) {
        return (_jsx(QreatorRequestCertifierImage, { onNext: handleDocumentVerificationNext, onBack: handleBack, currentStep: currentStep, totalSteps: 4, steps: steps }));
    }
    if (currentStep === 4) {
        return (_jsx(QreatorRequestPlanSetup, { onNext: handlePlanSetupNext, onBack: handleBack, currentStep: currentStep, totalSteps: 4, steps: steps }));
    }
    if (currentStep === 5) {
        return (_jsx(AuthLayout, { children: _jsxs("div", { className: "space-y-6 text-center", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full", children: _jsx(CheckCircle, { className: "h-8 w-8 text-white" }) }), _jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u7533\u8ACB\u5B8C\u4E86" }), _jsxs("p", { className: "text-sm text-gray-600", children: ["\u30AF\u30EA\u30A8\u30A4\u30BF\u30FC\u7533\u8ACB\u304C\u6B63\u5E38\u306B\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002", _jsx("br", {}), "\u5BE9\u67FB\u7D50\u679C\u306F3-5\u55B6\u696D\u65E5\u4EE5\u5185\u306B\u30E1\u30FC\u30EB\u3067\u304A\u77E5\u3089\u305B\u3044\u305F\u3057\u307E\u3059\u3002"] }), _jsx(Button, { onClick: () => window.location.href = '/account', className: "bg-primary hover:bg-primary/90 text-white", children: "\u30DE\u30A4\u30DA\u30FC\u30B8\u3078" })] }) }));
    }
    return (_jsx(AuthLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u30AF\u30EA\u30A8\u30A4\u30BF\u30FC\u7533\u8ACB\u624B\u7D9A\u304D" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u4EE5\u4E0B\u306E\u624B\u9806\u3067\u30AF\u30EA\u30A8\u30A4\u30BF\u30FC\u7533\u8ACB\u3092\u884C\u3063\u3066\u304F\u3060\u3055\u3044" })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-2", children: "\u7533\u8ACB\u524D\u306E\u78BA\u8A8D\u4E8B\u9805" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 18\u6B73\u4EE5\u4E0A\u3067\u3042\u308B\u3053\u3068" }), _jsx("li", { children: "\u2022 \u6709\u52B9\u306A\u8EAB\u5206\u8A3C\u660E\u66F8\u3092\u304A\u6301\u3061\u3067\u3042\u308B\u3053\u3068" }), _jsx("li", { children: "\u2022 \u5229\u7528\u898F\u7D04\u306B\u540C\u610F\u3044\u305F\u3060\u3051\u308B\u3053\u3068" })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", id: "terms", checked: agreedToTerms, onChange: (e) => setAgreedToTerms(e.target.checked), className: "rounded border-gray-300 text-primary focus:ring-primary" }), _jsxs("label", { htmlFor: "terms", className: "text-sm text-gray-700", children: [_jsx("a", { href: "#", className: "text-primary hover:text-primary/80", children: "\u5229\u7528\u898F\u7D04" }), "\u306B\u540C\u610F\u3057\u307E\u3059"] })] }), _jsx(Button, { onClick: handleStartApplication, disabled: !agreedToTerms || isSubmitting, className: "w-full bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300", children: isSubmitting ? '申請中...' : '申請を開始する' })] }) }));
}
