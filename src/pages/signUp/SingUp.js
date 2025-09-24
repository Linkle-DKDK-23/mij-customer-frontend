import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/api/endpoints/user';
export default function SingUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sign up form submitted:', formData);
        try {
            const response = await signUp(formData);
            console.log('Sign up response:', response);
            navigate('/login');
        }
        catch (error) {
            console.error('Sign up error:', error);
            alert('登録に失敗しました');
        }
    };
    const handleTwitterSignUp = () => {
        console.log('Twitter sign up clicked');
    };
    const isFormValid = formData.email && formData.password;
    return (_jsx(AuthLayout, { title: "\u65B0\u898F\u767B\u9332", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), _jsx(Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleInputChange, className: "mt-1", required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium text-gray-700", children: "\u30D1\u30B9\u30EF\u30FC\u30C9" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Input, { id: "password", name: "password", type: showPassword ? 'text' : 'password', value: formData.password, onChange: handleInputChange, className: "pr-10", required: true }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-medium text-gray-700", children: "\u540D\u524D" }), _jsx(Input, { id: "name", name: "name", type: "text", value: formData.name, onChange: handleInputChange, className: "mt-1", required: true })] }), _jsx(Button, { type: "submit", disabled: !isFormValid, className: "w-full bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300", children: "\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u4F5C\u6210" })] }), _jsx("div", { className: "text-center", children: _jsx("span", { className: "text-gray-500", children: "or" }) }), _jsx(Button, { onClick: handleTwitterSignUp, className: "w-full bg-blue-500 hover:bg-blue-600 text-white", children: "Twitter\u3067\u767B\u9332" }), _jsx("div", { className: "text-center", children: _jsxs("span", { className: "text-sm text-gray-600", children: ["\u3059\u3067\u306B\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u304A\u6301\u3061\u3067\u3059\u304B\uFF1F", ' ', _jsx("a", { href: "/login", className: "text-primary hover:text-primary/80", children: "\u30ED\u30B0\u30A4\u30F3" })] }) })] }) }));
}
