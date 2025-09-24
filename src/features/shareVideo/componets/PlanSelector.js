import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Check } from 'lucide-react';
import { getPlans, createPlan } from '@/api/endpoints/plans';
export default function PlanSelector({ selectedPlanId, onPlanSelect, onClose }) {
    const [plans, setPlans] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        name: '',
        description: '',
        price: 1000,
    });
    useEffect(() => {
        loadPlans();
    }, []);
    const loadPlans = async () => {
        try {
            const response = await getPlans();
            setPlans(response.plans);
        }
        catch (error) {
            console.error('プラン取得エラー:', error);
        }
    };
    const handleCreatePlan = async () => {
        if (!createFormData.name.trim() || createFormData.price <= 0) {
            alert('プラン名と価格を正しく入力してください');
            return;
        }
        setLoading(true);
        try {
            const newPlan = await createPlan(createFormData);
            setPlans([...plans, newPlan]);
            setShowCreateForm(false);
            setCreateFormData({ name: '', description: '', price: 1000 });
            onPlanSelect(newPlan.id, newPlan.name);
        }
        catch (error) {
            console.error('プラン作成エラー:', error);
            alert('プランの作成に失敗しました');
        }
        finally {
            setLoading(false);
        }
    };
    const selectedPlan = plans.find(p => selectedPlanId?.includes(p.id));
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "\u30D7\u30E9\u30F3\u3092\u9078\u629E" }), _jsx(Button, { variant: "outline", size: "sm", onClick: onClose, children: "\u00D7" })] }), !showCreateForm ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "space-y-3 mb-4", children: plans.map((plan) => (_jsx("div", { className: `border rounded-lg p-4 cursor-pointer transition-all ${selectedPlanId?.includes(plan.id)
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'}`, onClick: () => onPlanSelect(plan.id, plan.name), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: plan.name }), _jsx("p", { className: "text-sm text-gray-600", children: plan.description }), _jsxs("p", { className: "text-sm font-semibold text-primary", children: ["\u00A5", plan.price.toLocaleString(), "/\u6708"] })] }), selectedPlanId?.includes(plan.id) && (_jsx(Check, { className: "h-5 w-5 text-primary" }))] }) }, plan.id))) }), _jsxs(Button, { onClick: () => setShowCreateForm(true), className: "w-full mb-2", variant: "outline", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "\u65B0\u3057\u3044\u30D7\u30E9\u30F3\u3092\u4F5C\u6210"] })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "plan-name", children: "\u30D7\u30E9\u30F3\u540D *" }), _jsx(Input, { id: "plan-name", value: createFormData.name, onChange: (e) => setCreateFormData({ ...createFormData, name: e.target.value }), placeholder: "\u30D7\u30E9\u30F3\u540D\u3092\u5165\u529B" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "plan-description", children: "\u8AAC\u660E" }), _jsx(Textarea, { id: "plan-description", value: createFormData.description, onChange: (e) => setCreateFormData({ ...createFormData, description: e.target.value }), placeholder: "\u30D7\u30E9\u30F3\u306E\u8AAC\u660E\u3092\u5165\u529B" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "plan-price", children: "\u6708\u984D\u6599\u91D1 (\u5186) *" }), _jsx(Input, { id: "plan-price", type: "number", value: createFormData.price, onChange: (e) => setCreateFormData({ ...createFormData, price: parseInt(e.target.value) || 0 }), min: "1" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { onClick: handleCreatePlan, disabled: loading, className: "flex-1", children: loading ? '作成中...' : '作成' }), _jsx(Button, { variant: "outline", onClick: () => setShowCreateForm(false), className: "flex-1", children: "\u30AD\u30E3\u30F3\u30BB\u30EB" })] })] }))] }) }));
}
