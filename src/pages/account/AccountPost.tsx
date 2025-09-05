import React, { useState } from 'react';
import AccountHeader from '@/feateure/account/component/AccountHeader';
import AccountNavigation from '@/feateure/account/component/AccountNavigation';

// セクションコンポーネントをインポート
import PostContentSection from '@/feateure/account/AccountPost/PostContentSection';

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  status: 'review' | 'revision' | 'private' | 'published' | 'deleted';
  date: string;
  price?: number;
}

type PostStatus = 'review' | 'revision' | 'private' | 'published' | 'deleted';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'サンプル投稿1',
    thumbnail: 'https://picsum.photos/300/200?random=120',
    status: 'published',
    date: '2025/08/01',
    price: 1000
  },
  {
    id: '2',
    title: 'サンプル投稿2',
    thumbnail: 'https://picsum.photos/300/200?random=121',
    status: 'review',
    date: '2025/08/02',
    price: 1500
  },
  {
    id: '3',
    title: 'サンプル投稿3',
    thumbnail: 'https://picsum.photos/300/200?random=122',
    status: 'private',
    date: '2025/08/03',
    price: 800
  }
];

const statusLabels: Record<PostStatus, string> = {
  review: '審査中',
  revision: '要修正',
  private: '非公開',
  published: '公開済み',
  deleted: '削除'
};

const statusCounts = {
  review: mockPosts.filter(p => p.status === 'review').length,
  revision: mockPosts.filter(p => p.status === 'revision').length,
  private: mockPosts.filter(p => p.status === 'private').length,
  published: mockPosts.filter(p => p.status === 'published').length,
  deleted: mockPosts.filter(p => p.status === 'deleted').length
};

export default function AccountPost() {
  const [activeStatus, setActiveStatus] = useState<PostStatus>('published');

  const navigationItems = [
    { id: 'review', label: '審査中', count: statusCounts.review, isActive: activeStatus === 'review' },
    { id: 'revision', label: '要修正', count: statusCounts.revision, isActive: activeStatus === 'revision' },
    { id: 'private', label: '非公開', count: statusCounts.private, isActive: activeStatus === 'private' },
    { id: 'published', label: '公開済み', count: statusCounts.published, isActive: activeStatus === 'published' },
    { id: 'deleted', label: '削除', count: statusCounts.deleted, isActive: activeStatus === 'deleted' }
  ];

  const handleStatusClick = (statusId: string) => {
    setActiveStatus(statusId as PostStatus);
  };

  const filteredPosts = mockPosts.filter(post => post.status === activeStatus);

  return (
    <div className="bg-white">
      <AccountHeader title="投稿の管理" showBackButton />
      
      {/* Navigation */}
      <AccountNavigation items={navigationItems} onItemClick={handleStatusClick} />

      {/* Content Section */}
      <div className="p-1 mt-10">
        <PostContentSection 
          posts={filteredPosts}
          activeStatus={activeStatus}
          statusLabels={statusLabels}
        />
      </div>
    </div>
  );
}
