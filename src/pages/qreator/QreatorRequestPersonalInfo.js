import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Calendar, MapPin } from 'lucide-react';
import VerificationLayout from '@/features/auth/VerificationLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { getGenders } from '@/api/endpoints/gender';
import { registerCreator } from '@/api/endpoints/creator';
export default function QreatorRequestPersonalInfo({ onNext, onBack, currentStep, totalSteps, steps }) {
    const [gender_slug, setContent] = useState([]);
    const [genders, setGenders] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        first_name_kana: '',
        last_name_kana: '',
        birth_date: '',
        address: '',
        phone_number: '',
        gender_slug: []
    });
    useEffect(() => {
        const fetchGenders = async () => {
            const genders = await getGenders();
            setGenders(genders);
        };
        fetchGenders();
    }, []);
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const handleContentChange = (value, checked) => {
        setFormData(prev => {
            const currentContent = prev.gender_slug || [];
            if (checked) {
                // チェックされた場合、配列に追加（重複を避ける）
                if (!currentContent.includes(value)) {
                    return {
                        ...prev,
                        gender_slug: [...currentContent, value]
                    };
                }
            }
            else {
                // チェックが外された場合、配列から削除
                return {
                    ...prev,
                    gender_slug: currentContent.filter(item => item !== value)
                };
            }
            return prev;
        });
    };
    const handleSubmit = async () => {
        console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
        if (!formData.name || !formData.first_name_kana || !formData.last_name_kana || !formData.birth_date || !formData.phone_number || !formData.gender_slug || formData.gender_slug.length === 0) {
            alert('必須項目をすべて入力してください');
            return;
        }
        await registerCreator(formData).then(() => {
            console.log("registerCreator success");
            onNext();
        }).catch((error) => {
            alert('登録に失敗しました');
            console.error(error);
        });
    };
    return (_jsx(VerificationLayout, { currentStep: currentStep, totalSteps: totalSteps, steps: steps, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary rounded-full", children: _jsx(User, { className: "h-8 w-8 text-white" }) }), _jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u500B\u4EBA\u60C5\u5831\u5165\u529B" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u30AF\u30EA\u30A8\u30A4\u30BF\u30FC\u767B\u9332\u306B\u5FC5\u8981\u306A\u500B\u4EBA\u60C5\u5831\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-2", children: ["\u6C0F\u540D ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { type: "text", id: "name", value: formData.name, onChange: (e) => handleInputChange('name', e.target.value), placeholder: "\u5C71\u7530\u592A\u90CE", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "first_name_kana", className: "block text-sm font-medium text-gray-700 mb-2", children: ["\u59D3\uFF08\u30AB\u30CA\uFF09 ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { type: "text", id: "first_name_kana", value: formData.first_name_kana, onChange: (e) => handleInputChange('first_name_kana', e.target.value), placeholder: "\u30E4\u30DE\u30C0", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "last_name_kana", className: "block text-sm font-medium text-gray-700 mb-2", children: ["\u540D\uFF08\u30AB\u30CA\uFF09 ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { type: "text", id: "last_name_kana", value: formData.last_name_kana, onChange: (e) => handleInputChange('last_name_kana', e.target.value), placeholder: "\u30BF\u30ED\u30A6", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" })] })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "birth_date", className: "block text-sm font-medium text-gray-700 mb-2", children: ["\u751F\u5E74\u6708\u65E5 ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx(Input, { type: "date", id: "birth_date", value: formData.birth_date, onChange: (e) => handleInputChange('birth_date', e.target.value), className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" })] })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "phone_number", className: "block text-sm font-medium text-gray-700 mb-2", children: ["\u96FB\u8A71\u756A\u53F7 ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { type: "tel", id: "phone_number", value: formData.phone_number, onChange: (e) => handleInputChange('phone_number', e.target.value), placeholder: "090-1234-5678", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "address", className: "block text-sm font-medium text-gray-700 mb-2", children: "\u4F4F\u6240" }), _jsxs("div", { className: "relative", children: [_jsx(MapPin, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }), _jsx(Textarea, { id: "address", value: formData.address, onChange: (e) => handleInputChange('address', e.target.value), placeholder: "\u6771\u4EAC\u90FD\u6E0B\u8C37\u533A...", rows: 3, className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "gender_slug", className: "block text-sm font-medium text-gray-700 mb-2", children: "\u6295\u7A3F\u5185\u5BB9\u306B\u3064\u3044\u3066" }), _jsx("div", { className: "flex flex-col space-y-4", children: genders.map((gender) => (_jsxs("div", { className: "flex items-center space-x-2 border border-gray-300 rounded-md p-4", children: [_jsx(Checkbox, { id: gender.slug, checked: formData.gender_slug.includes(gender.slug), onCheckedChange: (checked) => handleContentChange(gender.slug, checked) }), _jsx(Label, { htmlFor: gender.slug, className: "text-md text-gray-700", children: gender.name })] }, gender.slug))) })] })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-2", children: "\u500B\u4EBA\u60C5\u5831\u306E\u53D6\u308A\u6271\u3044\u306B\u3064\u3044\u3066" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 \u5165\u529B\u3055\u308C\u305F\u60C5\u5831\u306F\u672C\u4EBA\u78BA\u8A8D\u306E\u305F\u3081\u306B\u306E\u307F\u4F7F\u7528\u3055\u308C\u307E\u3059" }), _jsx("li", { children: "\u2022 \u500B\u4EBA\u60C5\u5831\u306F\u9069\u5207\u306B\u4FDD\u8B77\u3055\u308C\u3001\u7B2C\u4E09\u8005\u306B\u63D0\u4F9B\u3055\u308C\u308B\u3053\u3068\u306F\u3042\u308A\u307E\u305B\u3093" }), _jsx("li", { children: "\u2022 \u5FC5\u9808\u9805\u76EE\u306F\u6B63\u78BA\u306B\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" })] })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-2", children: "\u500B\u4EBA\u60C5\u5831\u306E\u53D6\u308A\u6271\u3044\u306B\u3064\u3044\u3066" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 \u5165\u529B\u3055\u308C\u305F\u60C5\u5831\u306F\u672C\u4EBA\u78BA\u8A8D\u306E\u305F\u3081\u306B\u306E\u307F\u4F7F\u7528\u3055\u308C\u307E\u3059" }), _jsx("li", { children: "\u2022 \u500B\u4EBA\u60C5\u5831\u306F\u9069\u5207\u306B\u4FDD\u8B77\u3055\u308C\u3001\u7B2C\u4E09\u8005\u306B\u63D0\u4F9B\u3055\u308C\u308B\u3053\u3068\u306F\u3042\u308A\u307E\u305B\u3093" }), _jsx("li", { children: "\u2022 \u5FC5\u9808\u9805\u76EE\u306F\u6B63\u78BA\u306B\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" })] })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { onClick: onBack, variant: "outline", className: "flex-1", children: "\u623B\u308B" }), _jsx(Button, { onClick: handleSubmit, className: "flex-1 bg-primary hover:bg-primary/90 text-white", children: "\u6B21\u3078" })] })] }) }));
}
