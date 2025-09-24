import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AccountHeader from '@/features/account/component/AccountHeader';
// セクションコンポーネントをインポート
import WithdrawalBalanceSection from '@/features/account/AccountSaleWithDraw/WithdrawalBalanceSection';
import WithdrawalApplicationSection from '@/features/account/AccountSaleWithDraw/WithdrawalApplicationSection';
import BankAccountSection from '@/features/account/AccountSaleWithDraw/BankAccountSection';
import WithdrawalHistorySection from '@/features/account/AccountSaleWithDraw/WithdrawalHistorySection';
import WithdrawalSubmitSection from '@/features/account/AccountSaleWithDraw/WithdrawalSubmitSection';
const mockWithdrawalData = {
    availableAmount: 0,
    withdrawalAmount: 0,
    fee: 330,
    netAmount: 0
};
const mockBankAccount = {
    bankName: '三菱UFJ銀行',
    branchName: '青葉台支店',
    accountNumber: '0219831'
};
const mockWithdrawalHistory = [];
export default function AccountSaleWithDraw() {
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const calculateNetAmount = (amount) => {
        return Math.max(0, amount - mockWithdrawalData.fee);
    };
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u58F2\u4E0A\u91D1\u306E\u51FA\u91D1\u7533\u8ACB", showBackButton: true }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx(WithdrawalBalanceSection, { availableAmount: mockWithdrawalData.availableAmount }), _jsx(WithdrawalApplicationSection, { fee: mockWithdrawalData.fee }), _jsx(BankAccountSection, { bankAccount: mockBankAccount }), _jsx(WithdrawalHistorySection, { withdrawalHistory: mockWithdrawalHistory }), _jsx(WithdrawalSubmitSection, { withdrawalAmount: withdrawalAmount })] })] }));
}
