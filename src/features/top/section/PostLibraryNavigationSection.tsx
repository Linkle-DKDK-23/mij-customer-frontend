import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ShoppingCart, Bookmark, Heart, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PostLibraryNavigationSection() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    // <section className="max-w-screen-md mx-auto bg-white border-b border-gray-200">
    //   <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //     <div className="flex justify-around w-full py-4">
    //       <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
    //         <ShoppingCart className="h-5 w-5" />
    //         <span className="font-medium text-xs">購入済み</span>
    //       </div>
    //       <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
    //         <Bookmark className="h-5 w-5" />
    //         <span className="font-medium text-xs">保存済み</span>
    //       </div>
    //       <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
    //         <Heart className="h-5 w-5" />
    //         <span className="font-medium text-xs">いいね済み</span>
    //       </div>
    //       <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
    //         <History className="h-5 w-5" />
    //         <span className="font-medium text-xs">閲覧履歴</span>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="max-w-screen-md mx-auto bg-white border-b border-gray-200">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-row justify-center gap-2 w-full">
          <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
            <span 
              className="font-medium text-xs"
              onClick={() => handleClick('/terms')}
            >
              利用規約
            </span>
          </div>
          <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
            <span 
              className="font-medium text-xs"
              onClick={() => handleClick('/legal-notice')}
            >
              特定商取引法に基づく表記
            </span>
          </div>
          <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
            <span 
              className="font-medium text-xs"
              onClick={() => handleClick('/privacy-policy')}
            >
              プライバシーポリシー
            </span>
          </div>

          {/* <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
            <Heart className="h-5 w-5" />
            <span className="font-medium text-xs">いいね済み</span>
          </div>
          <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
            <History className="h-5 w-5" />
            <span className="font-medium text-xs">閲覧履歴</span>
          </div> */}
        </div>
      </div>
    </section>
  );
} 