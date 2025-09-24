import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AccountHeader from '@/features/account/component/AccountHeader';
// セクションコンポーネントをインポート
import PlanHeaderSection from '@/features/account/AccountPlanSetting/PlanHeaderSection';
import EmptyPlanSection from '@/features/account/AccountPlanSetting/EmptyPlanSection';
import PlanListSection from '@/features/account/AccountPlanSetting/PlanListSection';
import PlanTipsSection from '@/features/account/AccountPlanSetting/PlanTipsSection';
const mockPlans = [
    {
        id: '1',
        title: 'ベーシックプラン',
        description: '基本的なコンテンツにアクセスできるプランです',
        price: 1000,
        isActive: true,
        subscriberCount: 5,
        createdDate: '2025/07/01'
    },
    {
        id: '2',
        title: 'プレミアムプラン',
        description: 'すべてのコンテンツにアクセスできるプランです',
        price: 2000,
        isActive: false,
        subscriberCount: 0,
        createdDate: '2025/07/15'
    }
];
export default function AccountPlanSetting() {
    const [plans, setPlans] = useState(mockPlans);
    const handleCreatePlan = () => {
        console.log('Create new plan');
    };
    const handleEditPlan = (planId) => {
        console.log('Edit plan:', planId);
    };
    const handleDeletePlan = (planId) => {
        setPlans(plans.filter(plan => plan.id !== planId));
    };
    const handleTogglePlan = (planId) => {
        setPlans(plans.map(plan => plan.id === planId
            ? { ...plan, isActive: !plan.isActive }
            : plan));
    };
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u30D7\u30E9\u30F3\u7BA1\u7406", showBackButton: true }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx(PlanHeaderSection, { onCreatePlan: handleCreatePlan }), plans.length === 0 ? (_jsx(EmptyPlanSection, { onCreatePlan: handleCreatePlan })) : (_jsx(PlanListSection, { plans: plans, onTogglePlan: handleTogglePlan, onEditPlan: handleEditPlan, onDeletePlan: handleDeletePlan })), _jsx(PlanTipsSection, {})] })] }));
}
