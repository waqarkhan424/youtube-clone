//@ts-nocheck
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";

const UserPage = () => {
    const [videos, setVideos] = useState([]);
    const [channels, setChannels] = useState([]);
    console.log("channels::::::::", channels)

    useEffect(() => {
        // Fetch user videos
        const fetchVideos = async () => {
            try {
                const userId = "6777c8b3a0b71da533cf285a"; // Replace with actual logged-in user ID
                const videoResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${userId}`
                );
                setVideos(videoResponse.data);
            } catch (err) {
                console.error("Error fetching videos:", err);
            }
        };

        // Fetch user channels
        const fetchChannels = async () => {
            try {
                const ownerId = "6777c8b3a0b71da533cf285a"; // Replace with actual logged-in user ID
                const channelResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/channels/user/${ownerId}`
                );
                setChannels(channelResponse.data);
            } catch (err) {
                console.error("Error fetching channels:", err);
            }
        };

        fetchVideos();
        fetchChannels();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>
            <section>
                <h2 className="text-xl font-semibold mb-2">My Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <VideoCard key={video._id} {...video} />
                    ))}
                </div>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">My Channels</h2>
                <ul>
                    {channels.map((channel) => (
                        <li key={channel._id}>{channel.name}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default UserPage;
