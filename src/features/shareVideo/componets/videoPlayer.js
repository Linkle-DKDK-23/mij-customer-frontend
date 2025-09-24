import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchVideoPlayUrl } from "@/api/endpoints/video";
export const VideoPlayer = ({ videoId, userId }) => {
    const [videoUrl, setVideoUrl] = useState("");
    useEffect(() => {
        const loadVideo = async () => {
            const request = {
                video_id: videoId,
                user_id: userId,
            };
            const response = await fetchVideoPlayUrl(request);
            console.log('response', response.play_url);
            const url = response.play_url;
            console.log('url', url);
            setVideoUrl(url);
        };
        loadVideo();
    }, [videoId, userId]);
    if (!videoUrl)
        return _jsx("p", { children: "Loading..." });
    return _jsx("video", { src: videoUrl, controls: true, width: "100%" });
};
