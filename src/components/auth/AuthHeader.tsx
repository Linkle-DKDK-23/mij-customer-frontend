import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function AuthHeader({ title, showBackButton = false, onBack }: AuthHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {showBackButton ? (
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      ) : (
        <div />
      )}
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <div />
    </div>
  );
}
