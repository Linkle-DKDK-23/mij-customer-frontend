import React from 'react';

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  status: 'review' | 'revision' | 'private' | 'published' | 'deleted';
  date: string;
  price?: number;
}

interface PostContentSectionProps {
  posts: Post[];
  activeStatus: string;
  statusLabels: Record<string, string>;
}

export default function PostContentSection({ posts, activeStatus, statusLabels }: PostContentSectionProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {statusLabels[activeStatus]}の投稿はありません
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative">
            <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover" />
            {post.price && (
              <div className="absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded">
                ¥{post.price.toLocaleString()}
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {statusLabels[post.status]}
            </div>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500 mb-1">{post.date}</p>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
} 