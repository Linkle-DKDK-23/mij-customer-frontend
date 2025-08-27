import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp } from 'lucide-react';
import AccountLayout from '@/feateure/account/AccountLayout';
import AccountHeader from '@/feateure/account/AccountHeader';

interface SalesData {
  withdrawableAmount: number;
  totalSales: number;
  todaySales: number;
  singleItemSales: number;
  planSales: number;
}

interface SalesTransaction {
  id: string;
  date: string;
  type: 'single' | 'plan';
  title: string;
  amount: number;
  buyer: string;
}

const mockSalesData: SalesData = {
  withdrawableAmount: 0,
  totalSales: 0,
  todaySales: 0,
  singleItemSales: 0,
  planSales: 0
};

const mockTransactions: SalesTransaction[] = [
  {
    id: '1',
    date: '2025/08/01',
    type: 'single',
    title: 'サンプル動画',
    amount: 1000,
    buyer: 'ユーザー1'
  },
  {
    id: '2',
    date: '2025/08/02',
    type: 'plan',
    title: 'ベーシックプラン',
    amount: 1500,
    buyer: 'ユーザー2'
  }
];

export default function AccountSale() {
  return (
    <div className="bg-white">
      <AccountHeader title="売上管理" showBackButton />
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">売上金の出金申請</h2>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            出金申請
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">出金可能売上金額</span>
              <span className="text-2xl font-bold text-gray-900">¥{mockSalesData.withdrawableAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">累計売上金額</span>
              <span className="text-2xl font-bold text-gray-900">¥{mockSalesData.totalSales.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">売上金データ</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">今日</span>
              <span className="text-gray-900">今日の売上</span>
            </div>
            <div className="text-center py-8">
              <div className="text-3xl font-bold text-gray-900">¥{mockSalesData.todaySales}</div>
              <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-600">
                <span>→ ¥{mockSalesData.todaySales} (前日比)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">期間別売上</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">単品売上</div>
              <div className="text-xl font-bold text-blue-900">¥{mockSalesData.singleItemSales}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600 mb-1">プラン売上</div>
              <div className="text-xl font-bold text-green-900">¥{mockSalesData.planSales}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">売上履歴</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
          </div>
          <div className="p-4">
            {mockTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                売上履歴がありません
              </div>
            ) : (
              <div className="space-y-3">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{transaction.date}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          transaction.type === 'single' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {transaction.type === 'single' ? '単品' : 'プラン'}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{transaction.title}</div>
                      <div className="text-xs text-gray-500">購入者: {transaction.buyer}</div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      ¥{transaction.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
