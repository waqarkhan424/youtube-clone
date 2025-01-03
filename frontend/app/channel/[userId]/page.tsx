//@ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import VideoCard from "@/components/VideoCard";

const ChannelPage = () => {

    // const searchParams = useSearchParams();
    // const userId = searchParams.get("userId");

    const userId = "6777c8b3a0b71da533cf285a";

    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (!userId) return;

        const fetchChannel = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/channels/user/${userId}`
                );
                const [channelData] = response.data; // Assuming API returns array
                setChannel(channelData);

                if (channelData) {
                    const videoResponse = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${userId}`
                    );
                    setVideos(videoResponse.data);
                }
            } catch (err) {
                console.error("Error fetching channel data:", err);
            }
        };

        fetchChannel();
    }, [userId]);

    return (
        <div className="p-4">
            {channel && (
                <>
                    <h1 className="text-2xl font-bold">{channel.name}</h1>
                    <p className="text-gray-600">{channel.description}</p>
                </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {videos.map((video) => (
                    <VideoCard key={video._id} {...video} />
                ))}
            </div>
        </div>
    );
};

export default ChannelPage;
