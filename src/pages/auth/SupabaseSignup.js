import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import AccountHeader from '@/features/account/component/AccountHeader';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/components/common';
import { signUpWithEmail } from '@/api/endpoints/supabaseAuth';
export default function SupabaseSignup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null); // エラーをクリア
    };
    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('パスワードが一致しません');
            return false;
        }
        if (formData.password.length < 6) {
            setError('パスワードは6文字以上で入力してください');
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting)
            return;
        if (!validateForm())
            return;
        setSubmitting(true);
        setError(null);
        try {
            const { error } = await signUpWithEmail(formData.email, formData.password);
            if (error) {
                setError(error.message);
            }
            else {
                setSuccess(true);
            }
        }
        catch (err) {
            setError('アカウント作成に失敗しました。しばらく時間をおいて再試行してください。');
        }
        finally {
            setSubmitting(false);
        }
    };
    if (success) {
        return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u65B0\u898F\u767B\u9332", showBackButton: true }), _jsx(AuthLayout, { children: _jsxs("div", { className: "text-center space-y-6", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full", children: _jsx(Mail, { className: "h-8 w-8 text-green-600" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u78BA\u8A8D\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F" }), _jsxs("p", { className: "text-sm text-gray-600", children: [formData.email, "\u306B\u78BA\u8A8D\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002", _jsx("br", {}), "\u30E1\u30FC\u30EB\u306B\u8A18\u8F09\u3055\u308C\u305F\u30EA\u30F3\u30AF\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u3001\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u6709\u52B9\u5316\u3057\u3066\u304F\u3060\u3055\u3044\u3002"] })] }), _jsx(Button, { onClick: () => navigate('/auth/login'), className: "w-full bg-primary hover:bg-primary/90 text-white", children: "\u30ED\u30B0\u30A4\u30F3\u30DA\u30FC\u30B8\u306B\u623B\u308B" })] }) })] }));
    }
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u65B0\u898F\u767B\u9332", showBackButton: true }), _jsx(AuthLayout, { children: _jsxs("div", { className: "space-y-6", children: [error && (_jsx(ErrorMessage, { message: error, variant: "error", onClose: () => setError(null) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "\u4F8B\uFF1Aexample@email.com", value: formData.email, onChange: handleInputChange, className: "mt-1", required: true, disabled: submitting })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium text-gray-700", children: "\u30D1\u30B9\u30EF\u30FC\u30C9\uFF086\u6587\u5B57\u4EE5\u4E0A\uFF09" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Input, { id: "password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5165\u529B", value: formData.password, onChange: handleInputChange, className: "pr-10", required: true, disabled: submitting, minLength: 6 }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), "aria-label": showPassword ? 'パスワードを隠す' : 'パスワードを表示', disabled: submitting, children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "confirmPassword", className: "text-sm font-medium text-gray-700", children: "\u30D1\u30B9\u30EF\u30FC\u30C9\uFF08\u78BA\u8A8D\uFF09" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? 'text' : 'password', placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u518D\u5165\u529B", value: formData.confirmPassword, onChange: handleInputChange, className: "pr-10", required: true, disabled: submitting }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowConfirmPassword(!showConfirmPassword), "aria-label": showConfirmPassword ? 'パスワードを隠す' : 'パスワードを表示', disabled: submitting, children: showConfirmPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] }), _jsx(Button, { type: "submit", disabled: submitting, className: "w-full bg-primary hover:bg-primary/90 text-white", children: submitting ? '送信中…' : 'アカウントを作成' })] }), _jsxs("div", { className: "text-center border-t border-gray-200 pt-4 space-y-2", children: [_jsx("p", { className: "text-sm text-gray-600", children: "\u3059\u3067\u306B\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u304A\u6301\u3061\u3067\u3059\u304B\uFF1F" }), _jsx(Button, { onClick: () => navigate('/auth/login'), disabled: submitting, variant: "outline", className: "w-full", children: "\u30ED\u30B0\u30A4\u30F3" })] })] }) })] }));
}
