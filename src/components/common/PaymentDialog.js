import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, CreditCard, Store, Smartphone, Wallet, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { formatPrice } from '@/lib/utils';
export default function PaymentDialog({ isOpen, onClose, post, onPaymentMethodSelect, purchaseType }) {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const paymentMethods = [
        {
            id: 'credit_card',
            name: 'クレジットカード',
            description: 'Visa、Mastercard、JCB、American Express',
            icon: CreditCard,
            popular: true,
        },
        {
            id: 'convenience_store',
            name: 'コンビニ決済',
            description: 'セブンイレブン、ファミマ、ローソン、ミニストップ',
            icon: Store,
            popular: false,
        },
        {
            id: 'mobile_payment',
            name: 'キャリア決済',
            description: 'ドコモ、au、ソフトバンク',
            icon: Smartphone,
            popular: false,
        },
        {
            id: 'digital_wallet',
            name: '電子マネー',
            description: 'PayPay、LINE Pay、楽天Pay',
            icon: Wallet,
            popular: false,
        },
    ];
    const handleMethodSelect = (methodId) => {
        setSelectedMethod(methodId);
    };
    const handleConfirm = () => {
        if (selectedMethod && termsChecked && privacyChecked && onPaymentMethodSelect) {
            onPaymentMethodSelect(selectedMethod);
        }
        onClose();
    };
    return (_jsxs(Dialog, { open: isOpen, onOpenChange: onClose, children: [_jsx(DialogOverlay, { className: "bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), _jsxs(DialogContent, { className: "fixed bottom-0 left-0 right-0 top-auto translate-y-0 translate-x-0 max-w-none w-full h-auto max-h-[85vh] rounded-t-2xl border-0 bg-white p-0 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300", children: [_jsx(DialogTitle, { className: "sr-only", children: "\u652F\u6255\u3044\u65B9\u6CD5\u9078\u629E" }), _jsxs("div", { className: "flex flex-col max-h-[85vh]", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "\u652F\u6255\u3044\u65B9\u6CD5\u9078\u629E" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "p-1 h-auto w-auto hover:bg-gray-100 rounded-full", children: _jsx(X, { className: "h-5 w-5 text-gray-500" }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto min-h-0 pb-4", children: [post && (_jsx("div", { className: "p-4 border-b border-gray-100 bg-gray-50", children: purchaseType === 'single' ? (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0", children: _jsx("img", { src: post.thumbnail, alt: post.title, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-medium text-gray-900 text-sm truncate", children: post.title }), _jsxs("p", { className: "text-xs text-gray-600 truncate", children: ["@", post.creator.slug] })] })] })) : (_jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx("h3", { className: "font-medium text-gray-900 text-md font-bold truncate", children: "\u52A0\u5165\u5BFE\u8C61\u30D7\u30E9\u30F3" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h2", { className: "font-medium text-xl font-bold truncate", children: post.subscription.plan_name }), _jsx("h4", { className: "text-medium truncate", children: post.subscription.plan_description })] })] })) })), _jsxs("div", { className: "p-4 space-y-3", children: [_jsx("h3", { className: "text-sm font-medium text-gray-700 mb-3", children: "\u652F\u6255\u3044\u65B9\u6CD5\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044" }), paymentMethods.map((method) => {
                                                const IconComponent = method.icon;
                                                const isSelected = selectedMethod === method.id;
                                                return (_jsx("div", { onClick: () => handleMethodSelect(method.id), className: `relative p-4 border rounded-xl cursor-pointer transition-all duration-200 ${isSelected
                                                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`, children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`, children: _jsx(IconComponent, { className: `h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}` }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h4", { className: `font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`, children: method.name }), method.popular && (_jsx("span", { className: "px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full", children: "\u4EBA\u6C17" }))] }), _jsx("p", { className: `text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`, children: method.description })] }), isSelected && (_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "w-6 h-6 bg-primary rounded-full flex items-center justify-center", children: _jsx(Check, { className: "h-4 w-4 text-white" }) }) }))] }) }, method.id));
                                            })] }), _jsxs("div", { className: "p-4 space-y-3 border-t border-gray-200", children: [_jsxs("h3", { className: "text-sm font-medium text-gray-700 mb-3", children: ["\u652F\u6255\u3044\u91D1\u984D ", _jsx("span", { className: "text-gray-500 text-xs", children: "\u624B\u6570\u659910\uFF05\u542B\u3080" }), " "] }), _jsx("div", { className: "text-sm text-gray-600", children: _jsxs("div", { className: "text-gray-600 flex items-center justify-between", children: [_jsx("h5", { className: "text-sm font-bold text-gray-500", children: "\u5408\u8A08" }), purchaseType === 'single' && (_jsxs("h1", { className: "text-4xl font-bold", children: ["\uFFE5", formatPrice(post?.single?.amount ?? 0)] })), purchaseType === 'subscription' && (_jsxs("h1", { className: "text-4xl font-bold", children: ["\uFFE5", formatPrice(post?.subscription?.amount ?? 0)] }))] }) })] }), _jsxs("div", { className: "p-4 space-y-3 border-t border-gray-200", children: [_jsx("h3", { className: "text-sm font-medium text-gray-700 mb-3", children: "\u3054\u6CE8\u610F\u4E8B\u9805" }), _jsxs("div", { className: "p-4 bg-yellow-50 border-t border-yellow-200", children: [_jsx("div", { className: "text-sm text-yellow-800", children: _jsxs("ul", { className: "space-y-1 text-xs", children: [_jsx("li", { children: "\u2022 \u6C7A\u6E08\u5B8C\u4E86\u5F8C\u3001\u5373\u5EA7\u306B\u30B3\u30F3\u30C6\u30F3\u30C4\u304C\u3054\u5229\u7528\u3044\u305F\u3060\u3051\u307E\u3059" }), _jsx("li", { children: "\u2022 \u4E00\u5EA6\u8CFC\u5165\u3057\u305F\u30B3\u30F3\u30C6\u30F3\u30C4\u306F\u7121\u671F\u9650\u3067\u8996\u8074\u53EF\u80FD\u3067\u3059" }), _jsx("li", { children: "\u2022 \u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u306F\u3067\u304D\u307E\u305B\u3093" }), _jsx("li", { children: "\u2022 \u8CFC\u5165\u5F8C\u306E\u8FD4\u91D1\u306F\u3067\u304D\u307E\u305B\u3093" })] }) }), _jsxs("div", { className: "flex flex-col space-y-3 mt-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms", checked: termsChecked, onCheckedChange: (checked) => setTermsChecked(checked === 'indeterminate' ? false : checked) }), _jsx("label", { htmlFor: "terms", className: "text-sm text-gray-600", children: "\u5229\u7528\u898F\u7D04\u306B\u540C\u610F\u3057\u307E\u3059" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "privacy", checked: privacyChecked, onCheckedChange: (checked) => setPrivacyChecked(checked === 'indeterminate' ? false : checked) }), _jsx("label", { htmlFor: "privacy", className: "text-sm text-gray-600", children: "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC\u306B\u540C\u610F\u3057\u307E\u3059" })] })] })] })] })] }), _jsx("div", { className: "p-4 border-t border-gray-200 bg-white", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { onClick: handleConfirm, disabled: !selectedMethod || !termsChecked || !privacyChecked, className: `w-full py-3 rounded-lg font-semibold ${selectedMethod && termsChecked && privacyChecked
                                                ? 'bg-primary hover:bg-primary/80 text-white'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`, children: selectedMethod && termsChecked && privacyChecked
                                                ? '選択した支払い方法で進む'
                                                : '支払い方法を選択し、同意事項にチェックしてください' }), _jsx(Button, { variant: "outline", onClick: onClose, className: "w-full py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50", children: "\u30AD\u30E3\u30F3\u30BB\u30EB" })] }) })] })] })] }));
}
