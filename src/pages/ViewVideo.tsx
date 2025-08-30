import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function ViewVideo() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <Header />

        {/* Video Content Section */}
        <section className="bg-white py-6">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900 mb-4">動画詳細</h1>
              {id && (
                <p className="text-gray-600">動画ID: {id}</p>
              )}
              <p className="text-gray-500 mt-4">
                このページでは動画の詳細表示機能を実装予定です。
              </p>
            </div>
          </div>
        </section>

        {/* Fixed Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
}