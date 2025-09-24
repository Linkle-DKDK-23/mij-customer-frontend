import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AccountHeader from '@/features/account/component/AccountHeader';
// セクションコンポーネントをインポート
import WithdrawalHeaderSection from '@/features/account/AccountSale/WithdrawalHeaderSection';
import SalesSummarySection from '@/features/account/AccountSale/SalesSummarySection';
import TodaySalesSection from '@/features/account/AccountSale/TodaySalesSection';
import PeriodSalesSection from '@/features/account/AccountSale/PeriodSalesSection';
import SalesHistorySection from '@/features/account/AccountSale/SalesHistorySection';
const mockSalesData = {
    withdrawableAmount: 0,
    totalSales: 0,
    todaySales: 0,
    singleItemSales: 0,
    planSales: 0
};
const mockTransactions = [
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
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u58F2\u4E0A\u7BA1\u7406", showBackButton: true }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx(WithdrawalHeaderSection, {}), _jsx(SalesSummarySection, { withdrawableAmount: mockSalesData.withdrawableAmount, totalSales: mockSalesData.totalSales }), _jsx(TodaySalesSection, { todaySales: mockSalesData.todaySales }), _jsx(PeriodSalesSection, { singleItemSales: mockSalesData.singleItemSales, planSales: mockSalesData.planSales }), _jsx(SalesHistorySection, { transactions: mockTransactions })] })] }));
}
