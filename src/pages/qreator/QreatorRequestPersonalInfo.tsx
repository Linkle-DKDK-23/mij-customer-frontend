import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Calendar, MapPin } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';

interface PersonalInfo {
  name: string;
  firstNameKana: string;
  lastNameKana: string;
  birthDate: string;
  address: string;
  phoneNumber: string;
}

interface QreatorRequestPersonalInfoProps {
  onNext: (data: PersonalInfo) => void;
  onBack: () => void;
}

export default function QreatorRequestPersonalInfo({ onNext, onBack }: QreatorRequestPersonalInfoProps) {
  const [formData, setFormData] = useState<PersonalInfo>({
    name: '',
    firstNameKana: '',
    lastNameKana: '',
    birthDate: '',
    address: '',
    phoneNumber: ''
  });

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.firstNameKana || !formData.lastNameKana || !formData.birthDate || !formData.phoneNumber) {
      alert('必須項目をすべて入力してください');
      return;
    }
    onNext(formData);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary rounded-full">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            個人情報入力
          </h2>
          <p className="text-sm text-gray-600">
            クリエイター登録に必要な個人情報を入力してください
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              氏名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="山田太郎"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstNameKana" className="block text-sm font-medium text-gray-700 mb-2">
                姓（カナ） <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstNameKana"
                value={formData.firstNameKana}
                onChange={(e) => handleInputChange('firstNameKana', e.target.value)}
                placeholder="ヤマダ"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="lastNameKana" className="block text-sm font-medium text-gray-700 mb-2">
                名（カナ） <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastNameKana"
                value={formData.lastNameKana}
                onChange={(e) => handleInputChange('lastNameKana', e.target.value)}
                placeholder="タロウ"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
              生年月日 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="090-1234-5678"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              住所
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="東京都渋谷区..."
                rows={3}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">個人情報の取り扱いについて</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 入力された情報は本人確認のためにのみ使用されます</li>
            <li>• 個人情報は適切に保護され、第三者に提供されることはありません</li>
            <li>• 必須項目は正確に入力してください</li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1"
          >
            戻る
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
          >
            次へ
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
