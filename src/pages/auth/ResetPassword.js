import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import AccountHeader from '@/features/account/component/AccountHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '@/components/common';
import { updatePassword } from '@/api/endpoints/supabaseAuth';
export default function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        // URLからaccess_tokenとrefresh_tokenを取得してSupabaseセッションを設定
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        if (!accessToken || !refreshToken) {
            setError('無効なリセットリンクです。パスワードリセットを再度お試しください。');
        }
    }, [searchParams]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
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
            const { error } = await updatePassword(formData.password);
            if (error) {
                setError(error.message);
            }
            else {
                setSuccess(true);
            }
        }
        catch (err) {
            setError('パスワードの更新に失敗しました。しばらく時間をおいて再試行してください。');
        }
        finally {
            setSubmitting(false);
        }
    };
    if (success) {
        return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u30D1\u30B9\u30EF\u30FC\u30C9\u30EA\u30BB\u30C3\u30C8" }), _jsx(AuthLayout, { children: _jsxs("div", { className: "text-center space-y-6", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full", children: _jsx(CheckCircle, { className: "h-8 w-8 text-green-600" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\u3067\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002" })] }), _jsx(Button, { onClick: () => navigate('/auth/login'), className: "w-full bg-primary hover:bg-primary/90 text-white", children: "\u30ED\u30B0\u30A4\u30F3\u30DA\u30FC\u30B8\u3078" })] }) })] }));
    }
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\u8A2D\u5B9A" }), _jsx(AuthLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u8A2D\u5B9A" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002" })] }), error && (_jsx(ErrorMessage, { message: error, variant: "error", onClose: () => setError(null) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium text-gray-700", children: "\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\uFF086\u6587\u5B57\u4EE5\u4E0A\uFF09" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Input, { id: "password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5165\u529B", value: formData.password, onChange: handleInputChange, className: "pr-10", required: true, disabled: submitting, minLength: 6 }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), "aria-label": showPassword ? 'パスワードを隠す' : 'パスワードを表示', disabled: submitting, children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "confirmPassword", className: "text-sm font-medium text-gray-700", children: "\u30D1\u30B9\u30EF\u30FC\u30C9\uFF08\u78BA\u8A8D\uFF09" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? 'text' : 'password', placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u518D\u5165\u529B", value: formData.confirmPassword, onChange: handleInputChange, className: "pr-10", required: true, disabled: submitting }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowConfirmPassword(!showConfirmPassword), "aria-label": showConfirmPassword ? 'パスワードを隠す' : 'パスワードを表示', disabled: submitting, children: showConfirmPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] }), _jsx(Button, { type: "submit", disabled: submitting, className: "w-full bg-primary hover:bg-primary/90 text-white", children: submitting ? '更新中…' : 'パスワードを更新' })] })] }) })] }));
}
