import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import AccountHeader from '@/features/account/component/AccountHeader';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/components/common';
import { resetPassword } from '@/api/endpoints/supabaseAuth';
export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting)
            return;
        setSubmitting(true);
        setError(null);
        try {
            const { error } = await resetPassword(email);
            if (error) {
                setError(error.message);
            }
            else {
                setSuccess(true);
            }
        }
        catch (err) {
            setError('パスワードリセットメールの送信に失敗しました。しばらく時間をおいて再試行してください。');
        }
        finally {
            setSubmitting(false);
        }
    };
    if (success) {
        return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u30D1\u30B9\u30EF\u30FC\u30C9\u30EA\u30BB\u30C3\u30C8", showBackButton: true }), _jsx(AuthLayout, { children: _jsxs("div", { className: "text-center space-y-6", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full", children: _jsx(Mail, { className: "h-8 w-8 text-blue-600" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u30EA\u30BB\u30C3\u30C8\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F" }), _jsxs("p", { className: "text-sm text-gray-600", children: [email, "\u306B\u30D1\u30B9\u30EF\u30FC\u30C9\u30EA\u30BB\u30C3\u30C8\u7528\u306E\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002", _jsx("br", {}), "\u30E1\u30FC\u30EB\u306B\u8A18\u8F09\u3055\u308C\u305F\u30EA\u30F3\u30AF\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u3001\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002"] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { onClick: () => setSuccess(false), variant: "outline", className: "w-full", children: "\u5225\u306E\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3067\u518D\u9001\u4FE1" }), _jsx(Button, { onClick: () => navigate('/auth/login'), className: "w-full bg-primary hover:bg-primary/90 text-white", children: "\u30ED\u30B0\u30A4\u30F3\u30DA\u30FC\u30B8\u306B\u623B\u308B" })] })] }) })] }));
    }
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u30D1\u30B9\u30EF\u30FC\u30C9\u30EA\u30BB\u30C3\u30C8", showBackButton: true }), _jsx(AuthLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5FD8\u308C\u305F\u65B9" }), _jsxs("p", { className: "text-sm text-gray-600", children: ["\u767B\u9332\u3057\u305F\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002", _jsx("br", {}), "\u30D1\u30B9\u30EF\u30FC\u30C9\u30EA\u30BB\u30C3\u30C8\u7528\u306E\u30EA\u30F3\u30AF\u3092\u304A\u9001\u308A\u3057\u307E\u3059\u3002"] })] }), error && (_jsx(ErrorMessage, { message: error, variant: "error", onClose: () => setError(null) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "\u4F8B\uFF1Aexample@email.com", value: email, onChange: (e) => {
                                                setEmail(e.target.value);
                                                setError(null);
                                            }, className: "mt-1", required: true, disabled: submitting })] }), _jsx(Button, { type: "submit", disabled: submitting || !email, className: "w-full bg-primary hover:bg-primary/90 text-white", children: submitting ? '送信中…' : 'リセットメールを送信' })] }), _jsx("div", { className: "text-center border-t border-gray-200 pt-4", children: _jsxs(Button, { onClick: () => navigate('/auth/login'), disabled: submitting, variant: "ghost", className: "inline-flex items-center text-sm text-gray-600 hover:text-gray-800", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "\u30ED\u30B0\u30A4\u30F3\u30DA\u30FC\u30B8\u306B\u623B\u308B"] }) })] }) })] }));
}
