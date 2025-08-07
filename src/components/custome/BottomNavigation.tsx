import React from 'react';
import { Home, Rss, TrendingUp, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BottomNavigation() {
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2 px-4">
          <div 
            className="flex flex-col items-center py-2 text-primary"
            onClick={() => navigate('/top')}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">ホーム</span>
          </div>
          <div 
            className="flex flex-col items-center py-2 text-gray-500 hover:text-primary cursor-pointer"
            onClick={() => navigate('/feed')}
          >
            <Rss className="h-6 w-6" />
            <span className="text-xs mt-1">注目</span>
          </div>
          <div 
            className="flex flex-col items-center py-2 text-gray-500 hover:text-primary cursor-pointer"
            onClick={() => navigate('/ranking/posts')}
          >
            <TrendingUp className="h-6 w-6" />
            <span className="text-xs mt-1">ランキング</span>
          </div>
          <div className="flex flex-col items-center py-2 text-gray-500 hover:text-primary cursor-pointer">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">メッセージ</span>
          </div>
          <div 
            className="flex flex-col items-center py-2 text-gray-500 hover:text-primary cursor-pointer"
            onClick={() => navigate('/account')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">アカウント</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
