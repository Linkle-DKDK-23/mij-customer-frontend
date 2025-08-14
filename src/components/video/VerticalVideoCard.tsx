import React, { useRef, useEffect, useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Play, Pause } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  videoUrl?: string;
}

interface VerticalVideoCardProps {
  post: Post;
  isActive: boolean;
  onVideoClick: () => void;
}

export default function VerticalVideoCard({ post, isActive, onVideoClick }: VerticalVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
    onVideoClick();
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={post.thumbnail}
          loop
          muted
          playsInline
          onClick={handleVideoClick}
        >
          <source src={post.videoUrl || post.thumbnail} type="video/mp4" />
        </video>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <Play className="h-16 w-16 text-white opacity-80" />
          </div>
        )}

        <div className="absolute right-4 bottom-20 flex flex-col space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-medium">{post.likes.toLocaleString()}</span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-medium">コメント</span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bookmark className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-medium">保存</span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Share className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-medium">シェア</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-20">
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={post.creator.avatar} 
              alt={post.creator.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <p className="text-white font-semibold text-sm">{post.creator.name}</p>
              <p className="text-white text-xs opacity-80">{post.views.toLocaleString()} 回視聴</p>
            </div>
          </div>
          <p className="text-white text-sm leading-relaxed">{post.title}</p>
        </div>
      </div>
    </div>
  );
}
