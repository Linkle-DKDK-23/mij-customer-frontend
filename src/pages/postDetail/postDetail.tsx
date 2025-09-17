import React, { useEffect, useRef, useState, useCallback } from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PostDetailData } from '@/api/types/post';
import { MessageCircle, Share, Play, ArrowLeft, MoreHorizontal, CheckCircle } from 'lucide-react';
import LikeButton from '@/components/social/LikeButton';
import BookmarkButton from '@/components/social/BookmarkButton';
import Hls from 'hls.js';
import { getPostDetail } from '@/api/endpoints/post';

export default function PostDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postId = searchParams.get('post_id');
  const [currentPost, setCurrentPost] = useState<PostDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [dragging, setDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);

  const formatTime = (t: number) => {
    if (!Number.isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const updateBuffered = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const ranges = v.buffered;
    let end = 0;
    for (let i = 0; i < ranges.length; i++) {
      if (ranges.start(i) <= v.currentTime && v.currentTime <= ranges.end(i)) {
        end = ranges.end(i);
        break;
      }
      end = Math.max(end, ranges.end(i));
    }
    setBufferedEnd(end);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentPost?.video_url) return;

    const onLoadedMetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration);
      }
    };
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onProgress = () => updateBuffered();

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('progress', onProgress);

    if (currentPost.video_url.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true });
        hlsRef.current = hls;
        hls.loadSource(currentPost.video_url);
        hls.attachMedia(video);

        hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
          const total = data?.details?.totalduration;
          if (Number.isFinite(total) && total > 0) setDuration(total);
        });

        hls.on(Hls.Events.ERROR, () => {});
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = currentPost.video_url;
      }
    } else {
      video.src = currentPost.video_url;
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('progress', onProgress);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentPost?.video_url, updateBuffered]);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) return;
      
      try {
        setLoading(true);
        const data = await getPostDetail(postId);
        console.log('data', data);
        setCurrentPost(data);
      } catch (error) {
        console.error('Failed to fetch post detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [postId]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const posToTime = (clientX: number) => {
    const el = barWrapRef.current;
    if (!el || duration <= 0) return 0;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const ratio = x / rect.width;
    return ratio * duration;
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!videoRef.current) return;
    setDragging(true);
    const t = posToTime(e.clientX);
    videoRef.current.currentTime = t;
    setCurrentTime(t);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragging || !videoRef.current) return;
    const t = posToTime(e.clientX);
    videoRef.current.currentTime = t;
    setCurrentTime(t);
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () => {
    setDragging(false);
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">投稿が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate mx-4">
            {currentPost.title}
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {/* Video Player */}
        <div className="relative bg-black aspect-video">
          {currentPost.video_url ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                loop
                muted
                playsInline
                onClick={togglePlay}
              />
              
              {/* Play button overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    <Play className="h-8 w-8 text-white ml-1" />
                  </button>
                </div>
              )}

              {/* Video Controls */}
              {currentPost.video_url && duration > 0 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    ref={barWrapRef}
                    className="relative h-3 flex items-center mb-2"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 h-1.5" />
                    <div
                      className="absolute top-0 left-0 h-1.5 rounded-full bg-white/35"
                      style={{ width: `${bufferedPct}%` }}
                    />
                    <div
                      className="absolute top-0 left-0 h-1.5 rounded-full bg-primary"
                      style={{ width: `${progressPct}%` }}
                    />
                    <div
                      className="absolute -top-1.5 h-4 w-4 rounded-full bg-primary shadow-lg"
                      style={{ left: `calc(${progressPct}% - 8px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-white/80 text-xs tabular-nums">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <p className="text-white text-center">動画が利用できません</p>
            </div>
          )}
        </div>

        {/* Creator Info */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img
              src={currentPost.creator.avatar}
              alt={currentPost.creator.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="font-semibold text-gray-900">{currentPost.creator.name}</h2>
                {currentPost.creator.verified && (
                  <CheckCircle className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className="text-sm text-gray-500">{currentPost.views.toLocaleString()} 回視聴</p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{currentPost.title}</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{currentPost.description}</p>
          
          {/* Categories */}
          {currentPost.categories && currentPost.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {currentPost.categories.map((category) => (
                <span
                  key={category.id}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Engagement Actions */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center justify-around">
            <LikeButton
              postId={currentPost.id}
              initialCount={currentPost.likes}
              className="flex-1 justify-center py-3 hover:bg-gray-50 rounded-lg transition-colors"
            />
            <BookmarkButton
              postId={currentPost.id}
              className="flex-1 justify-center py-3 hover:bg-gray-50 rounded-lg transition-colors"
            />
            <button className="flex-1 flex items-center justify-center space-x-2 py-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-500">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">コメント</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 py-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-500">
              <Share className="h-5 w-5" />
              <span className="text-sm font-medium">シェア</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}
