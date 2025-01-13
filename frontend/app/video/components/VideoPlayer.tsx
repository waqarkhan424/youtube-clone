
import React from "react";

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
    return (
        <video
            controls
            className="w-full rounded-lg shadow-lg"
            aria-label={title}
            src={videoUrl}
        />
    );
};

export default VideoPlayer;
