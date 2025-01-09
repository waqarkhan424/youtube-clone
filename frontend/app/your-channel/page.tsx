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




const fetchUser = async () => {
    const token = localStorage.getItem("authToken"); // Ensure the token is stored in localStorage
    console.log("token::::::", token)
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`, {
        withCredentials: true, // Ensure cookies are sent
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
        },
    });
    return response.data;
};


// const fetchUserVideos = async (): Promise<Video[]> => {
//     const token = localStorage.getItem("authToken");
//     if (!token) throw new Error("No authentication token found");

//     const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/my-videos`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the request
//             },
//         },
//     );
//     return response.data;
// };


const fetchUserVideos = async (userId: string): Promise<Video[]> => {
    // const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    console.log("userId:::::::::", userId)
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


// const uploadVideo = async (formData: FormData): Promise<void> => {
//     const token = localStorage.getItem("authToken");
//     if (!token) throw new Error("No authentication token found");

//     await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`, formData, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`, // Include the token for authentication
//         },
//     });
// };





const ChannelDashboard: React.FC = () => {
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const queryClient = useQueryClient();



    // Fetch user data using React Query
    const { data: user, isError: isUserError, isLoading: isUserLoading } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

    // Fetch user videos using React Query
    const { data: videos = [], isLoading } = useQuery({
        // queryKey: ["userVideos"],
        // queryFn: fetchUserVideos,

        queryKey: ["userVideos", user?._id],
        queryFn: () => fetchUserVideos(user?._id),
        enabled: !!user, // Only run this query when user data is available


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


        if (!user?._id) {
            alert("User not found. Please refresh the page.");
            return;
        }



        // const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
        const formData = new FormData();
        formData.append("video", video);
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
        formData.append("title", title);
        formData.append("description", description);
        // formData.append("userId", userId);

        formData.append("userId", user._id); // Pass the userId from user data

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
