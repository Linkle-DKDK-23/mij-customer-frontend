import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import AccountLayout from '@/components/account/AccountLayout';
import AccountHeader from '@/components/account/AccountHeader';

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
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">売上金</h2>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {mockWithdrawalData.availableAmount}円
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">出金申請</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">手数料</span>
              <span className="text-gray-900">{mockWithdrawalData.fee}円</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">振込金額</span>
              <span className="text-gray-900">0円</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">振込先</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div>
              <div className="font-medium text-gray-900">{mockBankAccount.bankName}</div>
              <div className="text-sm text-gray-600">{mockBankAccount.branchName}</div>
              <div className="text-sm text-gray-600">普通 {mockBankAccount.accountNumber} ライクネット</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">過去履歴</h3>
          </div>
          <div className="p-6">
            {mockWithdrawalHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                履歴がありません
              </div>
            ) : (
              <div className="space-y-3">
                {mockWithdrawalHistory.map((history) => (
                  <div key={history.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">{history.date}</div>
                      <div className="font-medium text-gray-900">¥{history.amount.toLocaleString()}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      history.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : history.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {history.status === 'completed' ? '完了' : 
                       history.status === 'pending' ? '処理中' : '失敗'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            className="bg-primary hover:bg-primary/90 px-8"
            disabled={withdrawalAmount <= 0}
          >
            申請
          </Button>
        </div>
      </div>
    </div>
  );
}
