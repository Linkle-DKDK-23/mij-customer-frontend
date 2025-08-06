import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationItem {
  id: string;
  label: string;
  count?: number;
  isActive?: boolean;
}

interface AccountNavigationProps {
  items: NavigationItem[];
  onItemClick: (id: string) => void;
}

export default function AccountNavigation({ items, onItemClick }: AccountNavigationProps) {
  return (
    <div className="flex border-b border-gray-200">
      {items.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          className={`flex-1 rounded-none border-b-2 ${
            item.isActive 
              ? 'border-primary text-primary bg-primary/5' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onItemClick(item.id)}
        >
          {item.label}
          {item.count !== undefined && (
            <span className="ml-1 text-sm">{item.count}</span>
          )}
        </Button>
      ))}
    </div>
  );
}
