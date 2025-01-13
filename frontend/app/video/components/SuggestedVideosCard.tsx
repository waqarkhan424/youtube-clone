

import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { formatDistance } from "date-fns";

import axios from "axios";


interface SuggestedVideosCardProps {
    title: string;
    url: string;
    thumbnailUrl: string;
    views: number;
    uploadedAt: string;
    userId: string; // User ID associated with the video


}

const fetchUserDetails = async (userId: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/${userId}`
    );
    return response.data;
};

const SuggestedVideosCard: React.FC<SuggestedVideosCardProps> = ({ title, url: videoUrl, thumbnailUrl, views, uploadedAt, userId }) => {
    const [duration, setDuration] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement>(null);



    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const handleLoadedMetadata = () => {
                const minutes = Math.floor(videoElement.duration / 60);
                const seconds = Math.floor(videoElement.duration % 60);
                setDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
            };

            // Add event listener when video URL changes
            videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

            // Trigger metadata load manually if possible
            if (videoElement.readyState >= 1) {
                handleLoadedMetadata();
            }

            return () => {
                videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
            };
        }
    }, [videoUrl]); // Add videoUrl as a dependency



    const { data: user, isLoading } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUserDetails(userId),
        enabled: !!userId,
    });






    const formatTimeAgo = (date: string) => {
        const now = new Date();
        const diffInSeconds = Math.round((now.getTime() - new Date(date).getTime()) / 1000);

        if (diffInSeconds < 60) {
            // Handle cases for less than a minute
            return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
        }

        // Fallback to date-fns for larger differences
        const formatted = formatDistance(new Date(date), now, { addSuffix: true });
        return formatted.replace(/^about\s/, ''); // Remove "about" if present
    };

    if (!user || !user.channels?.length) {
        return null; // Return nothing if user or channels are unavailable
    }

    const { channels } = user;
    const { channelName } = channels[0];





    return (
        <div className="flex items-start gap-4">

            {/* Thumbnail and Video Container */}

            <div className="relative  w-24 h-16 rounded-lg overflow-hidden">
                {/* Thumbnail */}

                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${thumbnailUrl}`}
                    alt={title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 hover:opacity-0"
                />
                {/* Video */}

                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 hover:opacity-100"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${videoUrl}`}
                    muted
                ></video>
                {/* Duration Overlay */}

                {duration && (
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                        {duration}
                    </span>
                )}
            </div>


            <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-xs text-gray-600">
                    {channelName}
                </p>
                <p className="text-xs text-gray-500">
                    {views} views • {formatTimeAgo(uploadedAt)}
                </p>
            </div>
        </div>
    );
};

export default SuggestedVideosCard;
