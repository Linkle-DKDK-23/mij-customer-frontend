import React from 'react';

interface TodaySalesSectionProps {
  todaySales: number;
}

export default function TodaySalesSection({ todaySales }: TodaySalesSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">売上金データ</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">今日</span>
          <span className="text-gray-900">今日の売上</span>
        </div>
        <div className="text-center py-8">
          <div className="text-3xl font-bold text-gray-900">¥{todaySales}</div>
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-600">
            <span>→ ¥{todaySales} (前日比)</span>
          </div>
        </div>
      </div>
    </div>
  );
} 