import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { VideoPlayer } from '@/features/shareVideo/componets/videoPlayer';
export default function VideoPlayerSection({ videoId, userId }) {
    return (_jsxs("div", { style: { marginTop: 30 }, children: [_jsx("h4", { children: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5B8C\u4E86\u52D5\u753B:" }), _jsx(VideoPlayer, { videoId: videoId, userId: userId })] }));
}
