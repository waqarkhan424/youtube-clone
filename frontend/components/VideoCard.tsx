import { useEffect, useRef, useState } from "react";
import { formatDistance } from 'date-fns';


interface VideoCardProps {
    title: string;
    url: string;
    thumbnailUrl: string;
    views: number;
    uploadedAt: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, url, thumbnailUrl, views, uploadedAt }) => {
    const [duration, setDuration] = useState<string>(""); // State to store video duration
    const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element

    const formatTimeAgo = (date: string) => {
        const formatted = formatDistance(new Date(date), new Date(), { addSuffix: true });
        return formatted.replace(/^about\s/, ''); // Remove "about" if present
    };


    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleLoadedMetadata = () => {
                const totalSeconds = Math.floor(videoElement.duration);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
            };

            // Add event listener for metadata loaded
            videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

            return () => {
                // Cleanup event listener
                videoElement.removeEventListener(
                    "loadedmetadata",
                    handleLoadedMetadata
                );
            };
        }
    }, []);



    return (
        <div className="max-w-xs">
            {/* Hover Thumbnail/Video Preview */}
            <div className="relative group">
                {/* Thumbnail */}
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${thumbnailUrl}`}
                    alt={title}
                    className="w-full h-48 object-cover rounded-lg"
                />
                {/* Video Preview */}
                <video
                    ref={videoRef}
                    controls
                    muted
                    loop
                    className="absolute top-0 left-0 w-full h-48 object-cover rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <source src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`} type="video/mp4" />
                </video>

                {/* Display Actual Video Duration */}
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                    {duration || "Loading..."}
                </span>
            </div>


            {/* Video Info */}
            <div className="flex mt-2 gap-2 items-start">
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${thumbnailUrl}`}
                    alt="Channel Profile"
                    className="w-9 h-9 rounded-full"
                />
                <div className="flex-1">

                    <h3
                        className="text-sm font-semibold overflow-hidden text-ellipsis"
                        style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2, // Limit to 2 lines
                            lineHeight: "1.2em", // Adjust line spacing
                            maxHeight: "2.4em", // Ensure 2 lines are visible
                        }}
                    >
                        {title}
                    </h3>

                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        Apna College
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 "
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.293-6.707a1 1 0 011.414 0l5-5a1 1 0 10-1.414-1.414L12 13.586l-1.793-1.793a1 1 0 00-1.414 1.414l3 3z"
                                clipRule="evenodd"
                            />
                        </svg>

                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <p>{views} views</p>
                        <span>•</span>
                        <p>{formatTimeAgo(uploadedAt)}</p>
                    </div>
                </div>

                {/* Three-dots menu */}
                <div className="ml-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        focusable="false"
                        aria-hidden="true"
                    >
                        <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                    </svg>
                </div>

            </div>
        </div>
    );
};

export default VideoCard;
