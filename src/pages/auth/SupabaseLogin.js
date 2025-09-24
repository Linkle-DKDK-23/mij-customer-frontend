import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import AccountHeader from '@/features/account/component/AccountHeader';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/components/common';
import { signInWithEmail, signInWithTwitter } from '@/api/endpoints/supabaseAuth';
export default function SupabaseLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null); // エラーをクリア
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting)
            return;
        setSubmitting(true);
        setError(null);
        try {
            const { error } = await signInWithEmail(formData.email, formData.password);
            if (error) {
                setError(error.message);
            }
            else {
                // ログイン成功時、トップページに遷移
                navigate('/top');
            }
        }
        catch (err) {
            setError('ログインに失敗しました。しばらく時間をおいて再試行してください。');
        }
        finally {
            setSubmitting(false);
        }
    };
    const handleTwitterLogin = async () => {
        try {
            const { error } = await signInWithTwitter();
            if (error) {
                setError(error.message);
            }
        }
        catch (err) {
            setError('Twitterログインに失敗しました。');
        }
    };
    const handleForgotPassword = () => {
        navigate('/auth/forgot-password');
    };
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u30ED\u30B0\u30A4\u30F3", showBackButton: true }), _jsx(AuthLayout, { children: _jsxs("div", { className: "space-y-6", children: [error && (_jsx(ErrorMessage, { message: error, variant: "error", onClose: () => setError(null) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "\u5165\u529B\u3059\u308B", value: formData.email, onChange: handleInputChange, className: "mt-1", required: true, disabled: submitting })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium text-gray-700", children: "\u30D1\u30B9\u30EF\u30FC\u30C9" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Input, { id: "password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "\u5165\u529B\u3059\u308B", value: formData.password, onChange: handleInputChange, className: "pr-10", required: true, disabled: submitting }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), "aria-label": showPassword ? 'パスワードを隠す' : 'パスワードを表示', disabled: submitting, children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] }), _jsx(Button, { type: "submit", disabled: submitting, className: "w-full bg-primary hover:bg-primary/90 text-white", children: submitting ? '送信中…' : 'ログイン' })] }), _jsx(Button, { onClick: handleTwitterLogin, disabled: submitting, className: "w-full bg-blue-500 hover:bg-blue-600 text-white", children: "X\u3067\u30ED\u30B0\u30A4\u30F3" }), _jsx("div", { className: "text-center space-y-2", children: _jsx("button", { onClick: handleForgotPassword, className: "text-sm text-primary hover:text-primary/80", children: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5FD8\u308C\u305F\u65B9\u306F\u3053\u3061\u3089" }) }), _jsx("div", { className: "text-center border-t border-gray-200 pt-4 space-y-2", children: _jsx(Button, { onClick: () => navigate('/auth/signup'), disabled: submitting, className: "w-full bg-blue-500 hover:bg-blue-600 text-white", children: "\u65B0\u898F\u767B\u9332" }) })] }) })] }));
}
