import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils';
import { X } from 'lucide-react';
import PaymentLoading from '@/components/common/PaymentLoading';
export default function CreditPaymentDialog({ isOpen, onClose, post, onPayment, purchaseType }) {
    const [showPaymentLoading, setShowPaymentLoading] = useState(false);
    const [cardData, setCardData] = useState({
        cardName: '',
        cardNumber: '',
        securityCode: '',
        expiryMonth: '',
        expiryYear: ''
    });
    // 重複実行を防ぐためのRef
    const isProcessing = useRef(false);
    const handleInputChange = (field, value) => {
        setCardData(prev => ({ ...prev, [field]: value }));
    };
    const formatCardNumber = (value) => {
        // 数字のみを抽出し、4桁ごとにスペースを挿入
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    };
    const handleCardNumberChange = (value) => {
        const formatted = formatCardNumber(value);
        handleInputChange('cardNumber', formatted);
    };
    const handleSubmit = () => {
        // 既に処理中の場合は何もしない
        if (isProcessing.current)
            return;
        isProcessing.current = true;
        setShowPaymentLoading(true);
        onPayment();
    };
    const handlePaymentComplete = () => {
        isProcessing.current = false;
        setShowPaymentLoading(false);
        onClose();
    };
    const isFormValid = cardData.cardName && cardData.cardNumber && cardData.securityCode && cardData.expiryMonth && cardData.expiryYear;
    return (_jsxs(_Fragment, { children: [showPaymentLoading && (_jsx(PaymentLoading, { onComplete: handlePaymentComplete, autoComplete: true, duration: 5000 })), _jsxs(Dialog, { open: isOpen, onOpenChange: onClose, children: [_jsx(DialogOverlay, { className: "bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), _jsxs(DialogContent, { className: "fixed bottom-0 left-0 right-0 top-auto translate-y-0 translate-x-0 max-w-none w-full h-auto max-h-[80vh] rounded-t-2xl border-0 bg-white p-0 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300", children: [_jsx(DialogTitle, { className: "sr-only", children: "\u30AF\u30EC\u30B8\u30C3\u30C8\u30AB\u30FC\u30C9\u6C7A\u6E08" }), _jsx(DialogDescription, { className: "sr-only", children: "\u30AF\u30EC\u30B8\u30C3\u30C8\u30AB\u30FC\u30C9\u60C5\u5831\u3092\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002" }), _jsxs("div", { className: "flex flex-col max-h-[80vh]", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "\u30AF\u30EC\u30B8\u30C3\u30C8\u30AB\u30FC\u30C9\u6C7A\u6E08" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "p-1 h-auto w-auto hover:bg-gray-100 rounded-full", children: _jsx(X, { className: "h-5 w-5 text-gray-500" }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto min-h-0 p-4 space-y-6", children: [_jsx("div", { className: "bg-gray-50 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "\u652F\u6255\u3044\u91D1\u984D" }), purchaseType === 'single' ? (_jsxs("h1", { className: "text-3xl font-bold text-gray-900", children: ["\u00A5", formatPrice(post.single.amount)] })) : purchaseType === 'subscription' ? (_jsxs("h1", { className: "text-3xl font-bold text-gray-900", children: ["\u00A5", formatPrice(post.subscription.amount)] })) : null] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u30AF\u30EC\u30B8\u30C3\u30C8\u30AB\u30FC\u30C9\u60C5\u5831" }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: "\u30AF\u30EC\u30B8\u30C3\u30C8\u30AB\u30FC\u30C9\u60C5\u5831\u3092\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "cardName", className: "text-sm font-medium text-gray-700", children: "\u30AB\u30FC\u30C9\u540D\u7FA9" }), _jsx(Input, { id: "cardName", type: "text", placeholder: "TARO YAMADA", value: cardData.cardName, onChange: (e) => handleInputChange('cardName', e.target.value.toUpperCase()), className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "cardNumber", className: "text-sm font-medium text-gray-700", children: "\u30AB\u30FC\u30C9\u756A\u53F7" }), _jsx(Input, { id: "cardNumber", type: "text", placeholder: "1234 5678 9012 3456", value: cardData.cardNumber, onChange: (e) => handleCardNumberChange(e.target.value), maxLength: 19, className: "w-full" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-sm font-medium text-gray-700", children: "\u6709\u52B9\u671F\u9650" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { type: "text", placeholder: "MM", value: cardData.expiryMonth, onChange: (e) => {
                                                                                    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                                                    handleInputChange('expiryMonth', value);
                                                                                }, maxLength: 2, className: "w-full" }), _jsx("span", { className: "flex items-center text-gray-500", children: "/" }), _jsx(Input, { type: "text", placeholder: "YY", value: cardData.expiryYear, onChange: (e) => {
                                                                                    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                                                    handleInputChange('expiryYear', value);
                                                                                }, maxLength: 2, className: "w-full" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "securityCode", className: "text-sm font-medium text-gray-700", children: "\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u30B3\u30FC\u30C9" }), _jsx(Input, { id: "securityCode", type: "text", placeholder: "123", value: cardData.securityCode, onChange: (e) => {
                                                                            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                                            handleInputChange('securityCode', value);
                                                                        }, maxLength: 4, className: "w-full" })] })] })] }), _jsx("div", { className: "bg-blue-50 rounded-lg p-4", children: _jsxs("div", { className: "text-sm text-blue-800", children: [_jsx("p", { className: "font-medium mb-2", children: "\u3054\u6CE8\u610F\u4E8B\u9805" }), _jsxs("ul", { className: "space-y-1 text-xs", children: [_jsx("li", { children: "\u2022 \u6C7A\u6E08\u306F\u5B89\u5168\u306ASSL\u6697\u53F7\u5316\u901A\u4FE1\u3067\u884C\u308F\u308C\u307E\u3059" }), _jsx("li", { children: "\u2022 \u30AB\u30FC\u30C9\u60C5\u5831\u306F\u4FDD\u5B58\u3055\u308C\u307E\u305B\u3093" }), _jsx("li", { children: "\u2022 \u6C7A\u6E08\u5B8C\u4E86\u5F8C\u3001\u5373\u5EA7\u306B\u30B3\u30F3\u30C6\u30F3\u30C4\u304C\u3054\u5229\u7528\u3044\u305F\u3060\u3051\u307E\u3059" })] })] }) })] }), _jsx("div", { className: "p-4 border-t border-gray-200 bg-white", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { onClick: handleSubmit, disabled: !isFormValid || isProcessing.current, className: `w-full py-3 rounded-lg font-semibold ${isFormValid && !isProcessing.current
                                                        ? 'bg-primary hover:bg-primary/80 text-white'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`, children: isProcessing.current
                                                        ? '処理中...'
                                                        : isFormValid
                                                            ? '決済を実行する'
                                                            : 'すべての項目を入力してください' }), _jsx(Button, { variant: "outline", onClick: onClose, disabled: isProcessing.current, className: "w-full py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50", children: "\u30AD\u30E3\u30F3\u30BB\u30EB" })] }) })] })] })] })] }));
}
