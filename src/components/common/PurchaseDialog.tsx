import React from 'react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, CreditCard, Lock } from 'lucide-react';
import { PostDetailData } from '@/api/types/post';
import { formatPrice } from '@/lib/utils';

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostDetailData;
  onPurchase: (type: 'single' | 'subscription') => void;
}

export default function PurchaseDialog({ isOpen, onClose, post, onPurchase }: PurchaseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent className="fixed bottom-0 left-0 right-0 top-auto translate-y-0 translate-x-0 max-w-none w-full h-auto max-h-[80vh] rounded-t-2xl border-0 bg-white p-0 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300">
        <DialogTitle className="sr-only">購入確認</DialogTitle>
        <div className="flex flex-col">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">購入確認</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1 h-auto w-auto"
            >
            </Button>
          </div>

          {/* コンテンツ */}
          <div className="p-4 space-y-4">
            {/* 投稿情報 */}
            <div className="flex space-x-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                <p className="text-sm text-gray-600 truncate">@{post.creator.slug}</p>
                <p className="text-sm text-gray-500">
                  本編 {post.main_video_duration}
                </p>
              </div>
            </div>

            {/* 価格情報 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                {post.single !== null && (
                  <>
                    <span className="text-sm text-gray-600">単品購入価格</span>
                    <span className="text-lg font-bold text-gray-900">¥{formatPrice(post.single.amount)}</span>
                  </>
                )}
                {post.subscription !== null && (
                  <>
                    <span className="text-sm text-gray-600">プラン価格</span>
                    <span className="text-lg font-bold text-gray-900">¥{formatPrice(post.subscription.amount)}</span>
                  </>
                )}
              </div>
            </div>

            {/* 注意事項 */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Lock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">購入後の注意事項</p>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li>• 購入後は無期限で視聴可能です</li>
                    <li>• ダウンロードはできません</li>
                    <li>• 返金はできません</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 購入ボタン */}
            <div className="space-y-2">
              {post.single !== null && (
                <Button
                  onClick={() => onPurchase('single')}
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>¥{formatPrice(post.single.amount)}で購入する</span>
              </Button>
              )}
              {post.subscription !== null && (
                <Button
                  onClick={() => onPurchase('subscription')}
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>プラン¥{formatPrice(post.subscription.amount)}に加入して視聴する</span>
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full py-3 rounded-lg"
              >
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
