import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { toggleLike, getLikeStatus } from '@/api/endpoints/social';

interface LikeButtonProps {
  postId: string;
  initialLiked?: boolean;
  initialCount?: number;
  className?: string;
}

export default function LikeButton({ 
  postId, 
  initialLiked = false, 
  initialCount = 0, 
  className = "" 
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 初期状態を取得
    const fetchLikeStatus = async () => {
      try {
        const response = await getLikeStatus(postId);
        setLiked(response.data.liked);
        setLikesCount(response.data.likes_count);
      } catch (error) {
        console.error('Failed to fetch like status:', error);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  const handleToggleLike = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await toggleLike(postId);
      setLiked(response.data.liked || false);
      
      // いいね数を更新
      const statusResponse = await getLikeStatus(postId);
      setLikesCount(statusResponse.data.likes_count);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading}
      className={`flex items-center space-x-2 px-4 py-2 transition-colors ${
        liked
          ? 'text-red-500'
          : 'text-gray-500'
      } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <Heart
        className={`h-3 w-3 ${liked ? 'fill-current' : ''}`}
      />
      <span className="text-sm font-medium">{likesCount}</span>
    </button>
  );
}