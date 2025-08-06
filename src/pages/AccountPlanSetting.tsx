import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AccountLayout from '@/components/account/AccountLayout';
import AccountHeader from '@/components/account/AccountHeader';

interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  subscriberCount: number;
  createdDate: string;
}

const mockPlans: Plan[] = [
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
  const [plans, setPlans] = useState<Plan[]>(mockPlans);

  const handleCreatePlan = () => {
    console.log('Create new plan');
  };

  const handleEditPlan = (planId: string) => {
    console.log('Edit plan:', planId);
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  const handleTogglePlan = (planId: string) => {
    setPlans(plans.map(plan => 
      plan.id === planId 
        ? { ...plan, isActive: !plan.isActive }
        : plan
    ));
  };

  return (
    <AccountLayout>
      <AccountHeader title="プラン管理" showBackButton />
      
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">プラン一覧</h2>
          <Button 
            onClick={handleCreatePlan}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            新しいプランを作成
          </Button>
        </div>

        <div className="space-y-4">
          {plans.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
                <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">プランを作成しましょう</h3>
                <p className="text-gray-600 mb-4">
                  プランを作成して、ファンに定期的なコンテンツを提供しましょう
                </p>
                <Button 
                  onClick={handleCreatePlan}
                  className="bg-primary hover:bg-primary/90"
                >
                  プランを作成する
                </Button>
              </div>
            </div>
          ) : (
            plans.map((plan) => (
              <div key={plan.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        plan.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {plan.isActive ? '公開中' : '非公開'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{plan.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>月額 ¥{plan.price.toLocaleString()}</span>
                      <span>{plan.subscriberCount}人が加入中</span>
                      <span>作成日: {plan.createdDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePlan(plan.id)}
                    >
                      {plan.isActive ? '非公開にする' : '公開する'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPlan(plan.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePlan(plan.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">プラン作成のコツ</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 魅力的なプラン名と説明文を設定しましょう</li>
            <li>• 適切な価格設定でファンが加入しやすくしましょう</li>
            <li>• 定期的なコンテンツ更新でファンを満足させましょう</li>
          </ul>
        </div>
      </div>
    </AccountLayout>
  );
}
