import React from 'react';
import { Home, Rss, TrendingUp, MessageCircle, User } from 'lucide-react';

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          <div className="flex flex-col items-center py-2 px-3 text-primary">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">ホーム</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary cursor-pointer">
            <Rss className="h-6 w-6" />
            <span className="text-xs mt-1">注目</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary cursor-pointer">
            <TrendingUp className="h-6 w-6" />
            <span className="text-xs mt-1">新着</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary cursor-pointer">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">メッセージ</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary cursor-pointer">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">アカウント</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
