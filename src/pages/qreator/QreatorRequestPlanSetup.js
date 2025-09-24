import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Check } from 'lucide-react';
import VerificationLayout from '@/features/auth/VerificationLayout';
const plans = [
    {
        id: 'basic',
        name: 'ベーシックプラン',
        monthlyFee: 500,
        description: '基本的な機能を利用できます',
        features: [
            '月額500円',
            '動画投稿無制限',
            '基本的な分析機能',
            'コミュニティ機能'
        ]
    },
    {
        id: 'premium',
        name: 'プレミアムプラン',
        monthlyFee: 1000,
        description: '充実した機能でクリエイター活動をサポート',
        features: [
            '月額1,000円',
            '動画投稿無制限',
            '詳細な分析機能',
            'コミュニティ機能',
            'ライブ配信機能',
            '優先サポート'
        ],
        recommended: true
    },
    {
        id: 'pro',
        name: 'プロプラン',
        monthlyFee: 2000,
        description: 'プロクリエイター向けの最上位プラン',
        features: [
            '月額2,000円',
            '動画投稿無制限',
            '高度な分析機能',
            'コミュニティ機能',
            'ライブ配信機能',
            '専属サポート',
            'カスタムブランディング',
            'API連携'
        ]
    }
];
export default function QreatorRequestPlanSetup({ onNext, onBack, currentStep, totalSteps, steps }) {
    const [selectedPlan, setSelectedPlan] = useState('premium');
    const handleSubmit = () => {
        const plan = plans.find(p => p.id === selectedPlan);
        if (!plan)
            return;
        onNext({
            planType: selectedPlan,
            monthlyFee: plan.monthlyFee,
            description: plan.description
        });
    };
    return (_jsx(VerificationLayout, { currentStep: currentStep, totalSteps: totalSteps, steps: steps, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary rounded-full", children: _jsx(CreditCard, { className: "h-8 w-8 text-white" }) }), _jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u30D7\u30E9\u30F3\u9078\u629E" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u3042\u306A\u305F\u306B\u6700\u9069\u306A\u30AF\u30EA\u30A8\u30A4\u30BF\u30FC\u30D7\u30E9\u30F3\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044" })] }), _jsx("div", { className: "space-y-4", children: plans.map((plan) => (_jsxs("div", { className: `relative border-2 rounded-lg p-6 cursor-pointer transition-all ${selectedPlan === plan.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'} ${plan.recommended ? 'ring-2 ring-primary ring-opacity-20' : ''}`, onClick: () => setSelectedPlan(plan.id), children: [plan.recommended && (_jsx("div", { className: "absolute -top-3 left-1/2 transform -translate-x-1/2", children: _jsx("span", { className: "bg-primary text-white text-xs font-bold px-3 py-1 rounded-full", children: "\u304A\u3059\u3059\u3081" }) })), _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: plan.name }), _jsxs("div", { className: "ml-3 text-2xl font-bold text-primary", children: ["\u00A5", plan.monthlyFee.toLocaleString(), _jsx("span", { className: "text-sm font-normal text-gray-600", children: "/\u6708" })] })] }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: plan.description }), _jsx("ul", { className: "space-y-2", children: plan.features.map((feature, index) => (_jsxs("li", { className: "flex items-center text-sm text-gray-700", children: [_jsx(Check, { className: "h-4 w-4 text-green-500 mr-2 flex-shrink-0" }), feature] }, index))) })] }), _jsx("div", { className: `w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id
                                            ? 'border-primary bg-primary'
                                            : 'border-gray-300'}`, children: selectedPlan === plan.id && (_jsx(Check, { className: "h-4 w-4 text-white" })) })] })] }, plan.id))) }), _jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-yellow-900 mb-2", children: "\u30D7\u30E9\u30F3\u306B\u3064\u3044\u3066" }), _jsxs("ul", { className: "text-sm text-yellow-800 space-y-1", children: [_jsx("li", { children: "\u2022 \u30D7\u30E9\u30F3\u306F\u3044\u3064\u3067\u3082\u5909\u66F4\u53EF\u80FD\u3067\u3059" }), _jsx("li", { children: "\u2022 \u521D\u6708\u306F\u7121\u6599\u3067\u304A\u8A66\u3057\u3044\u305F\u3060\u3051\u307E\u3059" }), _jsx("li", { children: "\u2022 \u652F\u6255\u3044\u306F\u6708\u672B\u7DE0\u3081\u306E\u7FCC\u6708\u8ACB\u6C42\u3068\u306A\u308A\u307E\u3059" }), _jsx("li", { children: "\u2022 \u89E3\u7D04\u306F\u3044\u3064\u3067\u3082\u53EF\u80FD\u3067\u3059" })] })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { onClick: onBack, variant: "outline", className: "flex-1", children: "\u623B\u308B" }), _jsx(Button, { onClick: handleSubmit, className: "flex-1 bg-primary hover:bg-primary/90 text-white", children: "\u3053\u306E\u30D7\u30E9\u30F3\u3067\u7533\u8ACB\u3059\u308B" })] })] }) }));
}
