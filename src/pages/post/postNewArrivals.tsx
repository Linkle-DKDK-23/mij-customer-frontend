import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
import PostsSection from '@/components/common/PostsSection';
import { getNewArrivals } from '@/api/endpoints/post';
import { PostCardProps } from '@/components/common/PostCard';

export default function PostNewArrivals() {
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      const response = await getNewArrivals();
			console.log(response);
      setNewArrivals(response);
    };
    fetchNewArrivals();
  }, []);

  const convertToPosts = (posts: any[]): PostCardProps[] => {
    return posts.map(post => ({
      id: post.id,
      title: post.description || '',
      thumbnail: post.thumbnail_url || 'https://picsum.photos/300/200?random=1',
      duration: post.duration || 0,
      views: 0,
      likes: post.likes_count || 0,
      creator: {
        name: post.creator_name,
        display_name: post.display_name,
        avatar: post.creator_avatar_url || 'https://picsum.photos/40/40?random=1',
        verified: false
      },
      rank: 'rank' in post ? post.rank : undefined,
    }));
  };

  const handlePostClick = (postId: string) => {
    navigate(`/post/detail?post_id=${postId}`);
  };

  const handleCreatorClick = (displayName: string) => {
    navigate(`/account/profile?display_name=${displayName}`);
  };

  return (
    <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        <PostsSection
          title="新着投稿"
          posts={convertToPosts(newArrivals)}
          showRank={false}
          columns={2}
          onPostClick={handlePostClick}
          onCreatorClick={handleCreatorClick}
          showMoreButton={false}
        />
        <BottomNavigation />
      </div>
    </div>
  );
}