import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Coins, User, Settings, CreditCard, HelpCircle } from 'lucide-react';
import AccountLayout from '@/components/account/AccountLayout';
import AccountHeader from '@/components/account/AccountHeader';

interface SettingSection {
  id: string;
  title: string;
  items: SettingItem[];
}

interface SettingItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  hasArrow?: boolean;
  isButton?: boolean;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'destructive';
}

const settingSections: SettingSection[] = [
  {
    id: 'coins',
    title: '',
    items: [
      {
        id: 'coin-purchase',
        label: '保有コイン',
        isButton: true,
        buttonText: 'コイン購入',
        buttonVariant: 'default'
      }
    ]
  },
  {
    id: 'account',
    title: 'アカウント',
    items: [
      {
        id: 'subscribed-plans',
        label: '加入中のプラン',
        hasArrow: true
      },
      {
        id: 'creator-registration',
        label: 'クリエイター登録',
        hasArrow: true
      }
    ]
  },
  {
    id: 'settings',
    title: '設定',
    items: [
      {
        id: 'email',
        label: 'メールアドレス',
        hasArrow: true
      },
      {
        id: 'password',
        label: 'パスワード',
        hasArrow: true
      },
      {
        id: 'phone-verification',
        label: '電話番号認証',
        hasArrow: true
      },
      {
        id: 'email-notifications',
        label: 'メール・通知設定',
        hasArrow: true
      },
      {
        id: 'comment-settings',
        label: '投稿へのコメント',
        hasArrow: true
      }
    ]
  },
  {
    id: 'finance',
    title: 'ファイナンス',
    items: [
      {
        id: 'payment-methods',
        label: '支払い方法',
        hasArrow: true
      }
    ]
  },
  {
    id: 'help',
    title: '規約・ポリシー・ヘルプ',
    items: [
      {
        id: 'faq',
        label: 'よくある質問',
        hasArrow: true
      }
    ]
  }
];

export default function AccountSetting() {
  return (
    <div className="bg-white">
      <AccountHeader title="アカウント設定" showBackButton />
      
      <div className="p-6 space-y-6">
        {settingSections.map((section) => (
          <div key={section.id} className="space-y-3">
            {section.title && (
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg">
                  {item.isButton ? (
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <Coins className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{item.label}</span>
                        <span className="text-sm text-gray-500">330円</span>
                      </div>
                      <Button 
                        className={`${
                          item.buttonVariant === 'default' 
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                            : ''
                        }`}
                        variant={item.buttonVariant}
                      >
                        {item.buttonText}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="text-gray-900">{item.label}</span>
                      </div>
                      {item.hasArrow && (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
