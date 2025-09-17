import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Play } from 'lucide-react';
import Hls from 'hls.js';
import { PostDetailData } from '@/api/types/post';

interface VerticalVideoCardProps {
  post: PostDetailData;
  isActive: boolean;
  onVideoClick: () => void;
}

export default function VerticalVideoCard({ post, isActive, onVideoClick }: VerticalVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [dragging, setDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);

  // mm:ss
  const formatTime = (t: number) => {
    if (!Number.isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // バッファ終端を取得
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
      // 現在位置を含まない場合でも最大値を採用
      end = Math.max(end, ranges.end(i));
    }
    setBufferedEnd(end);
  }, []);

  // HLS セットアップ
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !post.video_url) return;

    const onLoadedMetadata = () => {
      // video.duration が効くならそれを採用
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration);
      }
    };
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onProgress = () => updateBuffered();

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('progress', onProgress);

    if (post.video_url.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true });
        hlsRef.current = hls;
        hls.loadSource(post.video_url);
        hls.attachMedia(video);

        // マニフェストから duration を拾う（VOD想定）
        hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
          const total = data?.details?.totalduration;
          if (Number.isFinite(total) && total > 0) setDuration(total);
        });

        hls.on(Hls.Events.ERROR, () => { /* 必要ならログ */ });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = post.video_url;
      }
    } else {
      video.src = post.video_url;
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
  }, [post.video_url, updateBuffered]);

  // アクティブ時の自動再生/停止
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

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
    onVideoClick();
  };

  // 位置→秒変換
  const posToTime = (clientX: number) => {
    const el = barWrapRef.current;
    if (!el || duration <= 0) return 0;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const ratio = x / rect.width;
    return ratio * duration;
  };

  // シーク操作
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

  return (
    <div className="relative w-full h-[calc(100vh-var(--nav-h)-env(safe-area-inset-bottom))] bg-black flex items-center justify-center">
      <div className="relative w-full h-full">
        {post.video_url ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            onClick={togglePlay}
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <p className="text-white text-center">動画が利用できません</p>
          </div>
        )}

        {/* 再生アイコン */}
        {post.video_url && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play className="h-16 w-16 text-white opacity-80" />
          </div>
        )}

        {/* プログレス（myfans風：薄いバッファ＋白い進捗＋ドラッグ可能） */}
        {post.video_url && duration > 0 && (
          <div
            className="absolute right-2 left-2 z-50 w-90% bottom-1"
          >
            <div
              ref={barWrapRef}
              className="relative h-3 flex items-center"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              {/* バックグラウンド（トラック） */}
              <div className="absolute inset-0 rounded-full bg-white/20 h-1.5" />
              {/* バッファ済み */}
              <div
                className="absolute top-0 left-0 h-1.5 rounded-full bg-white/35"
                style={{ width: `${bufferedPct}%` }}
              />
              {/* 再生済み */}
              <div
                className="absolute top-0 left-0 h-1.5 rounded-full bg-white"
                style={{ width: `${progressPct}%` }}
              />
              {/* ハンドル（つまみ） */}
              <div
                className="absolute -top-1.5 h-4 w-4 rounded-full bg-white shadow"
                style={{ left: `calc(${progressPct}% - 8px)` }}
              />
            </div>

            <div className="mt-1.5 flex justify-between text-white/80 text-[11px] tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        {/* 右側のアクション */}
        <div className="absolute right-4 bottom-16 flex flex-col space-y-6 z-50">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-medium">{post.likes.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-medium">コメント</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bookmark className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-medium">保存</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Share className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-medium">シェア</span>
          </div>
        </div>

        {/* クリエイター情報・タイトル */}
        <div className="absolute bottom-20 left-4 right-20">
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
