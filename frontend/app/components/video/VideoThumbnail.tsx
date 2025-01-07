import { useRef, useState, useEffect } from "react";

interface VideoThumbnailProps {
    thumbnailUrl: string;
    videoUrl: string;
    title: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ thumbnailUrl, videoUrl, title }) => {
    const [duration, setDuration] = useState<string>("Loading...");
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleLoadedMetadata = () => {
                const minutes = Math.floor(videoElement.duration / 60);
                const seconds = Math.floor(videoElement.duration % 60);
                setDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
            };
            videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
            return () => videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
        }
    }, []);

    return (
        <div className="relative group">
            <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${thumbnailUrl}`}
                alt={title}
                className="w-full h-48 object-cover rounded-lg"
            />
            <video
                ref={videoRef}
                controls
                muted
                loop
                className="absolute top-0 left-0 w-full h-48 object-cover rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <source src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${videoUrl}`} type="video/mp4" />
            </video>
            {/* Display Actual Video Duration */}
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                {duration}
            </span>
        </div>
    );
};

export default VideoThumbnail;
