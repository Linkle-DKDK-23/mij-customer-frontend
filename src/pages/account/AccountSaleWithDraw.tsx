import React, { useState } from 'react';
import AccountHeader from '@/feateure/account/component/AccountHeader';

// セクションコンポーネントをインポート
import WithdrawalBalanceSection from '@/feateure/account/AccountSaleWithDraw/WithdrawalBalanceSection';
import WithdrawalApplicationSection from '@/feateure/account/AccountSaleWithDraw/WithdrawalApplicationSection';
import BankAccountSection from '@/feateure/account/AccountSaleWithDraw/BankAccountSection';
import WithdrawalHistorySection from '@/feateure/account/AccountSaleWithDraw/WithdrawalHistorySection';
import WithdrawalSubmitSection from '@/feateure/account/AccountSaleWithDraw/WithdrawalSubmitSection';

interface WithdrawalData {
  availableAmount: number;
  withdrawalAmount: number;
  fee: number;
  netAmount: number;
}

interface BankAccount {
  bankName: string;
  branchName: string;
  accountNumber: string;
}

interface WithdrawalHistory {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}

const mockWithdrawalData: WithdrawalData = {
  availableAmount: 0,
  withdrawalAmount: 0,
  fee: 330,
  netAmount: 0
};

const mockBankAccount: BankAccount = {
  bankName: '三菱UFJ銀行',
  branchName: '青葉台支店',
  accountNumber: '0219831'
};

const mockWithdrawalHistory: WithdrawalHistory[] = [];

export default function AccountSaleWithDraw() {
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);

  const calculateNetAmount = (amount: number) => {
    return Math.max(0, amount - mockWithdrawalData.fee);
  };

  return (
    <div className="bg-white">
      <AccountHeader title="売上金の出金申請" showBackButton />
      
      <div className="p-6 space-y-6">
        {/* Withdrawal Balance Section */}
        <WithdrawalBalanceSection availableAmount={mockWithdrawalData.availableAmount} />

        {/* Withdrawal Application Section */}
        <WithdrawalApplicationSection fee={mockWithdrawalData.fee} />

        {/* Bank Account Section */}
        <BankAccountSection bankAccount={mockBankAccount} />

        {/* Withdrawal History Section */}
        <WithdrawalHistorySection withdrawalHistory={mockWithdrawalHistory} />

        {/* Withdrawal Submit Section */}
        <WithdrawalSubmitSection withdrawalAmount={withdrawalAmount} />
      </div>
    </div>
  );
}
