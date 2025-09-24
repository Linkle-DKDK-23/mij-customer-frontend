import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { ChevronRight, Coins } from 'lucide-react';
import AccountHeader from '@/features/account/component/AccountHeader';
const settingSections = [
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
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u30A2\u30AB\u30A6\u30F3\u30C8\u8A2D\u5B9A", showBackButton: true }), _jsx("div", { className: "p-6 space-y-6", children: settingSections.map((section) => (_jsxs("div", { className: "space-y-3", children: [section.title && (_jsx("h3", { className: "text-sm font-medium text-gray-500 uppercase tracking-wide", children: section.title })), _jsx("div", { className: "space-y-1", children: section.items.map((item) => (_jsx("div", { className: "bg-white border border-gray-200 rounded-lg", children: item.isButton ? (_jsxs("div", { className: "flex items-center justify-between p-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Coins, { className: "h-5 w-5 text-gray-400" }), _jsx("span", { className: "text-gray-900", children: item.label }), _jsx("span", { className: "text-sm text-gray-500", children: "330\u5186" })] }), _jsx(Button, { className: `${item.buttonVariant === 'default'
                                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                : ''}`, variant: item.buttonVariant, children: item.buttonText })] })) : (_jsxs("div", { className: "flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [item.icon, _jsx("span", { className: "text-gray-900", children: item.label })] }), item.hasArrow && (_jsx(ChevronRight, { className: "h-5 w-5 text-gray-400" }))] })) }, item.id))) })] }, section.id))) })] }));
}
