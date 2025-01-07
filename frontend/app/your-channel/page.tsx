"use client";
import { useState, useEffect } from "react";
import VideoList from "./components/VideoList";
import VideoUploadForm from "./components/VideoUploadForm";
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

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
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
            <VideoUploadForm
                title={title}
                description={description}
                video={video}
                thumbnail={thumbnail}
                setTitle={setTitle}
                setDescription={setDescription}
                setVideo={setVideo}
                setThumbnail={setThumbnail}
                onUpload={handleVideoUpload}
            />
            <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
            <VideoList videos={videos} />
        </div>
    );
};

export default ChannelDashboard;
