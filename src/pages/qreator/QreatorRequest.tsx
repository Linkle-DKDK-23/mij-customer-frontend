import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Phone, FileText, CreditCard } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';

interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

export default function QreatorRequest() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const steps: ApplicationStep[] = [
    {
      id: 1,
      title: 'SMS認証',
      description: '電話番号による本人確認',
      icon: <Phone className="h-6 w-6" />,
      completed: false,
      current: true
    },
    {
      id: 2,
      title: '身分証明書確認',
      description: '身分証明書のアップロード',
      icon: <FileText className="h-6 w-6" />,
      completed: false,
      current: false
    },
    {
      id: 3,
      title: 'プラン登録',
      description: 'クリエイタープランの設定',
      icon: <CreditCard className="h-6 w-6" />,
      completed: false,
      current: false
    }
  ];

  const handleSubmit = () => {
    if (!agreedToTerms) {
      alert('利用規約に同意してください');
      return;
    }
    console.log('Creator application submitted');
  };

  return (
    <AuthLayout title="クリエイター申請">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            クリエイター申請手続き
          </h2>
          <p className="text-sm text-gray-600">
            以下の手順でクリエイター申請を行ってください
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center p-4 rounded-lg border ${
                step.current
                  ? 'border-primary bg-primary/5'
                  : step.completed
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : step.current
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
              <div className="ml-4">
                {step.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">申請前の確認事項</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 18歳以上であること</li>
            <li>• 有効な身分証明書をお持ちであること</li>
            <li>• 利用規約に同意いただけること</li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            <a href="#" className="text-primary hover:text-primary/80">
              利用規約
            </a>
            に同意します
          </label>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!agreedToTerms}
          className="w-full bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300"
        >
          申請を開始する
        </Button>
      </div>
    </AuthLayout>
  );
}
