"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Video {
    _id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    description: string;
    views: number;
    likes: number;
    uploadedAt: string;
}

const ChannelDashboard: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    // console.log("videos::::::::", videos)
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const fetchUserVideos = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${userId}`
            );
            setVideos(response.data);
        } catch (error) {
            console.error("Error fetching user videos:", error);
        }
    };

    const handleVideoUpload = async () => {
        if (!video) {
            alert("Please select a video file to upload.");
            return;
        }

        if (!title.trim() || !description.trim()) {
            alert("Please provide a title and description for the video.");
            return;
        }

        const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;

        const formData = new FormData();
        formData.append("video", video);
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", userId);

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            // console.log("Upload response::::::::::", response.data);

            alert("Video uploaded successfully!");
            fetchUserVideos();
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Failed to upload video. Please try again.");
        }
    };

    useEffect(() => {
        fetchUserVideos();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Channel Dashboard</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Video Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded-md w-full mb-2"
                />
                <textarea
                    placeholder="Video Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded-md w-full mb-2"
                />
                <input
                    type="file"
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    className="border p-2 rounded-md"
                />


                <input
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                    className="border p-2 rounded-md"
                />


                <button
                    onClick={handleVideoUpload}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
                >
                    Upload Video
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div key={video._id} className="border p-4 rounded-md shadow-md">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${video.thumbnailUrl}`}
                            alt={video.title}
                            className="w-full h-48 object-cover rounded-md mb-2"
                        />
                        <video controls className="w-full rounded-md">
                            <source src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${video.url}`} type="video/mp4" />
                        </video>
                        <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
                        <p className="text-sm text-gray-600">{video.description}</p>
                        <div className="text-sm text-gray-500 mt-2">
                            <p>{video.views} views</p>
                            <p>{video.likes} likes</p>
                            <p>Uploaded on {new Date(video.uploadedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChannelDashboard;
