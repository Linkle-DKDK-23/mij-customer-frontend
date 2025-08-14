import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 bg-white  ">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">MIJ</div>
          {title && (
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          )}
        </div>
        <div className="bg-white rounded-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
