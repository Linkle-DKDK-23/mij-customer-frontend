import React from 'react';

interface AccountLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AccountLayout({ children, title }: AccountLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        {title && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
