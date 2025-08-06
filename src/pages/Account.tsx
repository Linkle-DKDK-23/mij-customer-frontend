import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, TrendingUp, FileText, CreditCard, HelpCircle } from 'lucide-react';
import AccountLayout from '@/components/account/AccountLayout';

interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  followerCount: number;
  postCount: number;
  coinBalance: number;
}

interface ManagementSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  count?: number;
}

const mockUser: UserProfile = {
  name: 'ピエール',
  username: '@piepie',
  avatar: 'https://picsum.photos/100/100?random=50',
  followerCount: 1,
  postCount: 3,
  coinBalance: 0
};

const managementSections: ManagementSection[] = [
  {
    id: 'posts',
    title: '投稿の管理',
    icon: <FileText className="h-6 w-6" />,
    description: '投稿の作成・編集・削除',
    count: 0
  },
  {
    id: 'sales',
    title: '売上管理',
    icon: <TrendingUp className="h-6 w-6" />,
    description: '売上の確認・出金申請',
    count: 0
  },
  {
    id: 'plans',
    title: 'プラン管理',
    icon: <CreditCard className="h-6 w-6" />,
    description: 'プランの作成・編集',
    count: 0
  },
  {
    id: 'settings',
    title: 'アカウント設定',
    icon: <Settings className="h-6 w-6" />,
    description: 'プロフィール・設定の変更'
  }
];

export default function Account() {
  return (
    <AccountLayout>
      <div className="p-6 space-y-8">
        <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
          <img 
            src={mockUser.avatar} 
            alt={mockUser.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{mockUser.name}</h2>
            <p className="text-gray-600">{mockUser.username}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>{mockUser.postCount}投稿</span>
              <span>{mockUser.followerCount}フォロワー</span>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            プロフィールを見る
          </Button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">売上金の出金申請</h3>
              <p className="text-sm text-gray-600 mt-1">出金可能売上金額: ¥{mockUser.coinBalance.toLocaleString()}</p>
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              出金申請
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">管理</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {managementSections.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="text-primary">{section.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{section.title}</h4>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                  {section.count !== undefined && (
                    <span className="text-lg font-semibold text-gray-900">{section.count}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">その他</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">クーポン管理</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">よくある質問</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
