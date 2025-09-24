import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Login.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import AccountHeader from '@/features/account/component/AccountHeader';
import { useNavigate } from 'react-router-dom';
// ★ 追加：API呼び出しとCSRFセット関数をインポート
import { login as loginApi, me as meApi } from '@/api/endpoints/auth';
import { setCsrfToken } from '@/api/axios'; // ← 先ほど修正した axios クライアントから
export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting)
            return;
        setSubmitting(true);
        try {
            // 1) /auth/login（Cookieにaccess/refresh、bodyでcsrf_token）
            const res = await loginApi(formData);
            const csrf = res.data?.csrf_token ?? null;
            setCsrfToken(csrf); // 2) メモリに保持（非GET時にX-CSRF-Tokenヘッダ自動付与）
            // 3) /auth/me でユーザー情報を取得（Cookieベース）
            await meApi();
            // 4) 成功 → 遷移
            navigate('/');
        }
        catch (err) {
            alert(err?.response?.data?.detail ?? 'ログイン失敗');
        }
        finally {
            setSubmitting(false);
        }
    };
    const handleTwitterLogin = () => {
        console.log('Twitter login clicked');
    };
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u30ED\u30B0\u30A4\u30F3", showBackButton: true }), _jsx(AuthLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "\u5165\u529B\u3059\u308B", value: formData.email, onChange: handleInputChange, className: "mt-1", required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium text-gray-700", children: "\u30D1\u30B9\u30EF\u30FC\u30C9" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Input, { id: "password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "\u5165\u529B\u3059\u308B", value: formData.password, onChange: handleInputChange, className: "pr-10", required: true }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), "aria-label": showPassword ? 'パスワードを隠す' : 'パスワードを表示', children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] }), _jsx(Button, { type: "submit", disabled: submitting, className: "w-full bg-primary hover:bg-primary/90 text-white", children: submitting ? '送信中…' : 'ログイン' })] }), _jsx(Button, { onClick: handleTwitterLogin, className: "w-full bg-blue-500 hover:bg-blue-600 text-white", children: "X\u3067\u30ED\u30B0\u30A4\u30F3" }), _jsx("div", { className: "text-center space-y-2", children: _jsx("a", { href: "#", className: "text-sm text-primary hover:text-primary/80", children: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5FD8\u308C\u305F\u65B9\u306F\u3053\u3061\u3089" }) }), _jsx("div", { className: "text-center border-t border-gray-200 pt-4 space-y-2", children: _jsx(Button, { onClick: () => navigate('/signup'), className: "w-full bg-blue-500 hover:bg-blue-600 text-white", children: "\u65B0\u898F\u767B\u9332" }) })] }) })] }));
}
