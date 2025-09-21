import React from 'react';
import { Home, Rss, TrendingUp, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthContext';

export default function BottomNavigation() {
  const navigate = useNavigate();
  const { user } = useAuth();


  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2 px-4">
          <div 
            className="flex flex-col items-center py-2 text-primary cursor-pointer w-16"
            onClick={() => navigate('/')}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium text-center">ホーム</span>
          </div>
          <div 
            className="flex flex-col items-center py-2 text-gray-500 hover:text-primary cursor-pointer w-16"
            onClick={() => navigate('/feed')}
          >
            <Rss className="h-6 w-6" />
            <span className="text-xs mt-1 text-center">カテゴリ</span>
          </div>
          <div 
            className="flex flex-col items-center py-2 text-gray-500 hover:text-primary cursor-pointer w-16"
            onClick={() => navigate('/share/post')}
          >
            <TrendingUp className="h-6 w-6" />
            <span className="text-xs mt-1 text-center">投稿</span>
          </div>
          <div 
            className="flex flex-col items-center py-2 text-gray-500 hover:text-primary cursor-pointer w-16"
            onClick={() => navigate('/ranking/posts')}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1 text-center">ランキング</span>
          </div>
          <div 
            className="flex flex-col items-center py-2 text-gray-500 hover:text-primary cursor-pointer w-16"
            onClick={() => navigate('/account')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1 text-center">アカウント</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
