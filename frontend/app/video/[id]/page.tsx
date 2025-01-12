"use client";
import { useEffect, useState } from "react";
import SuggestedVideos from "../components/SuggestedVideos";
import axios from "axios";

interface Video {
    _id: string;
    title: string;
    url: string;
    description: string;
    thumbnailUrl: string;
    views: number;
    uploadedAt: string;
    userId: string;
}

export default function VideoDetailsPage({ params }: { params: Promise<{ id: string }> }) {

    const [id, setId] = useState<string | null>(null); // Extracted video ID
    const [video, setVideo] = useState<Video | null>(null);
    const [otherVideos, setOtherVideos] = useState<Video[]>([]);

    useEffect(() => {
        // Unwrap the Promise from params
        params.then((resolvedParams) => {
            const { id: videoId } = resolvedParams;
            setId(videoId); // Set the video ID for further use


            // Fetch the selected video by ID
            axios
                .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}`)
                .then((response) => {
                    setVideo(response.data);
                })
                .catch((error) => console.error("Error fetching video:", error));

            // Fetch all videos excluding the current one
            axios
                .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`)
                .then((response) => {
                    const filteredVideos = response.data.filter((v: Video) => v._id !== videoId);
                    setOtherVideos(filteredVideos);
                })
                .catch((error) => console.error("Error fetching other videos:", error));
        });
    }, [params]);

    if (!video) return <p>Loading...</p>;

    return (


        <div className="flex flex-col md:flex-row gap-8 p-4">
            {/* Main Video Section */}
            <div className="flex-1">
                <video
                    controls
                    className="w-full rounded-lg shadow-lg"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${video.url}`}
                ></video>
                <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
                <p className="text-sm text-gray-600 mt-2">{video.description}</p>
            </div>

            {/* Suggested Videos Section */}
            <div className="w-full md:w-1/3">
                <h2 className="text-lg font-semibold mb-4">Suggested Videos</h2>
                <div className="space-y-4">
                    {otherVideos.map((otherVideo) => (
                        <SuggestedVideos
                            key={otherVideo._id}
                            title={otherVideo.title}
                            url={otherVideo.url}
                            views={otherVideo.views}
                            uploadedAt={otherVideo.uploadedAt}
                            thumbnailUrl={otherVideo.thumbnailUrl}
                            userId={otherVideo.userId}
                        />
                    ))}
                </div>
            </div>
        </div>



    );
}
