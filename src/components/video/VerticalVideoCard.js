import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState, useCallback } from 'react';
import { Heart, Bookmark, Play, Video, ArrowRight, Maximize, Minimize } from 'lucide-react';
import Hls from 'hls.js';
import { Button } from '@/components/ui/button';
export default function VerticalVideoCard({ post, isActive, onVideoClick, onPurchaseClick }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bufferedEnd, setBufferedEnd] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const barWrapRef = useRef(null);
    // 時間をフォーマットする関数
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    // main_video_durationをフォーマットする関数（分のみ表示、分がない場合は秒のみ）
    const formatMainVideoDuration = (duration) => {
        const [minutes, seconds] = duration.split(':').map(Number);
        if (minutes > 0) {
            return `${minutes}分`;
        }
        else {
            return `${seconds}秒`;
        }
    };
    // 全画面表示の処理
    const toggleFullscreen = async () => {
        if (!videoRef.current)
            return;
        try {
            if (!document.fullscreenElement) {
                // 全画面表示
                await videoRef.current.requestFullscreen();
                setIsFullscreen(true);
            }
            else {
                // 全画面解除
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
        catch (error) {
            console.error('全画面表示エラー:', error);
        }
    };
    // 全画面状態の監視
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);
    // バッファ終端を取得
    const updateBuffered = useCallback(() => {
        const v = videoRef.current;
        if (!v)
            return;
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
        if (!video || !post.video_url)
            return;
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
                    if (Number.isFinite(total) && total > 0)
                        setDuration(total);
                });
                hls.on(Hls.Events.ERROR, () => { });
            }
            else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = post.video_url;
            }
        }
        else {
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
        if (!v)
            return;
        if (isActive) {
            v.play().catch(() => { });
            setIsPlaying(true);
        }
        else {
            v.pause();
            setIsPlaying(false);
        }
    }, [isActive]);
    const togglePlay = () => {
        const v = videoRef.current;
        if (!v)
            return;
        if (v.paused) {
            v.play();
            setIsPlaying(true);
        }
        else {
            v.pause();
            setIsPlaying(false);
        }
        onVideoClick();
    };
    // 位置→秒変換
    const posToTime = (clientX) => {
        const el = barWrapRef.current;
        if (!el || duration <= 0)
            return 0;
        const rect = el.getBoundingClientRect();
        const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
        const ratio = x / rect.width;
        return ratio * duration;
    };
    // シーク操作
    const onPointerDown = (e) => {
        if (!videoRef.current)
            return;
        setDragging(true);
        const t = posToTime(e.clientX);
        videoRef.current.currentTime = t;
        setCurrentTime(t);
        e.target.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
        if (!dragging || !videoRef.current)
            return;
        const t = posToTime(e.clientX);
        videoRef.current.currentTime = t;
        setCurrentTime(t);
    };
    const onPointerUp = () => {
        setDragging(false);
    };
    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
    const bufferedPct = duration > 0 ? (bufferedEnd / duration) * 100 : 0;
    // 購入ボタンのクリック処理
    const handlePurchaseClick = (e) => {
        console.log('handlePurchaseClick');
        e.stopPropagation();
        if (onPurchaseClick) {
            onPurchaseClick();
        }
    };
    // 全画面ボタンのクリック処理
    const handleFullscreenClick = (e) => {
        e.stopPropagation();
        toggleFullscreen();
    };
    return (_jsx("div", { className: "relative w-full h-[calc(100vh-var(--nav-h)-env(safe-area-inset-bottom))] bg-black flex items-center justify-center", children: _jsxs("div", { className: "relative w-full h-full", children: [post.video_url ? (_jsx("video", { ref: videoRef, className: "w-full h-full object-cover", loop: true, muted: true, playsInline: true, onClick: togglePlay })) : (_jsx("div", { className: "w-full h-full bg-gray-800 flex items-center justify-center", children: _jsx("p", { className: "text-white text-center", children: "\u52D5\u753B\u304C\u5229\u7528\u3067\u304D\u307E\u305B\u3093" }) })), post.video_url && !isPlaying && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30", children: _jsx(Play, { className: "h-16 w-16 text-white opacity-80" }) })), _jsxs("div", { className: "absolute right-4 bottom-16 flex flex-col space-y-6 z-50", children: [_jsx("div", { className: "flex flex-col items-center space-y-2", children: _jsx("div", { className: "w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm", children: _jsx("img", { src: post.creator.avatar, alt: post.creator.name, className: "w-full h-full object-cover rounded-full" }) }) }), _jsxs("div", { className: "flex flex-col items-center space-y-2", children: [_jsx("div", { className: "w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm", children: _jsx(Heart, { className: "h-6 w-6 text-white" }) }), _jsx("span", { className: "text-white text-xs font-medium", children: post.likes.toLocaleString() })] }), _jsxs("div", { className: "flex flex-col items-center space-y-2", children: [_jsx("div", { className: "w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm", children: _jsx(Bookmark, { className: "h-6 w-6 text-white" }) }), _jsx("span", { className: "text-white text-xs font-medium", children: "\u4FDD\u5B58" })] }), post.video_url && (_jsx("div", { className: "flex flex-col items-center space-y-2", children: _jsx(Button, { variant: "ghost", size: "sm", onClick: handleFullscreenClick, className: "w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full p-0 backdrop-blur-sm", children: isFullscreen ? (_jsx(Minimize, { className: "h-5 w-5 text-white" })) : (_jsx(Maximize, { className: "h-5 w-5 text-white" })) }) }))] }), _jsxs("div", { className: "absolute bottom-0 left-0 right-20 flex flex-col space-y-4 z-40", children: [_jsxs("div", { className: "px-4 pb-4 flex flex-col space-y-4", children: [!post.purchased && (_jsxs(Button, { className: "w-fit flex items-center space-x-1 bg-primary text-white text-xs font-bold", onClick: handlePurchaseClick, children: [_jsx(Video, { className: "h-4 w-4" }), _jsxs("span", { children: ["\u672C\u7DE8", formatMainVideoDuration(post.main_video_duration), "\u3092\u8CFC\u5165\u3059\u308B"] }), _jsx(ArrowRight, { className: "h-4 w-4" })] })), _jsx("div", { className: "flex items-center space-x-3", children: _jsx("div", { children: _jsx("p", { className: "text-white font-semibold text-sm", children: post.creator.slug }) }) }), _jsx("p", { className: "text-white text-sm leading-relaxed", children: post.title }), _jsx("div", { className: "flex flex-wrap gap-2", children: post.categories.map((category) => (_jsx("span", { className: "text-white text-xs bg-primary px-2 py-1 rounded-full", children: category.name }, category.id))) })] }), post.video_url && duration > 0 && (_jsx("div", { className: "px-4 pb-4", children: _jsx("div", { className: "px-2 py-1 bg-primary/50 w-fit text-white text-md tabular-nums rounded-md mb-2", children: _jsxs("span", { children: [post.purchased ? '再生時間：' : 'サンプル：', formatTime(currentTime), "/", formatTime(duration)] }) }) }))] }), post.video_url && duration > 0 && (_jsx("div", { className: "absolute bottom-0 left-0 right-0 w-full z-30", children: _jsx("div", { className: "w-full", children: _jsxs("div", { ref: barWrapRef, className: "relative h-3 flex items-center", onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, children: [_jsx("div", { className: "absolute inset-0 rounded-full bg-white/20 h-1.5" }), _jsx("div", { className: "absolute top-0 left-0 h-1.5 rounded-full bg-white/35", style: { width: `${bufferedPct}%` } }), _jsx("div", { className: "absolute top-0 left-0 h-1.5 rounded-full bg-white", style: { width: `${progressPct}%` } }), _jsx("div", { className: "absolute -top-1.5 h-4 w-4 rounded-full bg-primary shadow", style: { left: `calc(${progressPct}% - 8px)` } })] }) }) }))] }) }));
}
