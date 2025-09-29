import React from 'react';
import { Button } from '@/components/ui/button';
import { AccountNavigationProps } from '@/features/account/types';


export default function AccountNavigation({ items, onItemClick }: AccountNavigationProps) {
  return (
    <div className="flex border-b border-gray-200 w-full justify-center">
      {items.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          className={`flex-1 flex-col items-center justify-center rounded-none border-b-2 h-16 ${
            item.isActive 
              ? 'border-primary text-primary bg-primary/5' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onItemClick(item.id)}
        >
          <span className="text-xs">{item.label}</span>
          {item.count !== undefined && (
            <span className="text-sm font-medium">{item.count}</span>
          )}
        </Button>
      ))}
    </div>
  );
}
