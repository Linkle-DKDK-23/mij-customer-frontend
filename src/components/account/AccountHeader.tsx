import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share, MessageCircle } from 'lucide-react';

interface AccountHeaderProps {
  title: string;
  showBackButton?: boolean;
  showActions?: boolean;
}

export default function AccountHeader({ title, showBackButton = false, showActions = false }: AccountHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        {showBackButton && (
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      {showActions && (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Share className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
