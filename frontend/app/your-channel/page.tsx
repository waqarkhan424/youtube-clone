"use client";
import { useState } from "react";
import VideoList from "./components/VideoList";
import VideoUploadForm from "./components/VideoUploadForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
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



const fetchUserVideos = async (): Promise<Video[]> => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${userId}`
    );
    return response.data;
};

const uploadVideo = async (formData: FormData): Promise<void> => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};




const ChannelDashboard: React.FC = () => {
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const queryClient = useQueryClient();

    // Fetch user videos using React Query
    const { data: videos = [], isLoading } = useQuery({
        queryKey: ["userVideos"],
        queryFn: fetchUserVideos,
    });


    // Mutation for uploading videos
    const mutation = useMutation({
        mutationFn: uploadVideo,
        onSuccess: () => {
            // Reset form fields
            setVideo(null);
            setThumbnail(null);
            setTitle("");
            setDescription("");
            queryClient.invalidateQueries({ queryKey: ["userVideos"] }); // Refresh the video list
            alert("Video uploaded successfully!");
        },
        onError: () => {
            alert("Failed to upload video. Please try again.");
        },
    });


    const handleVideoUpload = () => {
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

        mutation.mutate(formData);

    };


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
            {isLoading ? (
                <Loader />
            ) : (
                <VideoList videos={videos} />
            )}
        </div>
    );
};

export default ChannelDashboard;
