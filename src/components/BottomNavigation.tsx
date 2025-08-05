import React from 'react';
import { Home, Rss, TrendingUp, MessageCircle, User } from 'lucide-react';

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          <div className="flex flex-col items-center py-2 px-3 text-pink-500">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">Home</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-pink-500 cursor-pointer">
            <Rss className="h-6 w-6" />
            <span className="text-xs mt-1">Feed</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-pink-500 cursor-pointer">
            <TrendingUp className="h-6 w-6" />
            <span className="text-xs mt-1">Ranking</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-pink-500 cursor-pointer">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-pink-500 cursor-pointer">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Account</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
