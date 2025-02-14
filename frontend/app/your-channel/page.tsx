"use client";
import { useState } from "react";
import VideoList from "./components/VideoList";
import VideoUploadForm from "./components/VideoUploadForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useStore from "@/store/useStore";
import { Loader2 } from "lucide-react";
import Typography from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";


interface Video {
    _id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    description: string;
    views: number;
    likes: number;
    uploadedAt: string;
    userId: string; // Ensure userId is part of the Video type

}




const fetchUserVideos = async (userId: string): Promise<Video[]> => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/user/${userId}`
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


    const fetchUser = useStore((state) => state.fetchUser);

    const user = useStore((state) => state.user);
    const { toast } = useToast();


    // Fetch user on component mount
    useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });


    // Fetch user videos using React Query
    const { data: videos = [], isLoading } = useQuery({
        queryKey: ["userVideos", user?._id],
        queryFn: () => fetchUserVideos(user!._id),
        enabled: !!user?._id, // Ensure the query only runs when user._id is defined

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
            toast({
                title: "Success",
                description: "Video uploaded successfully!",
                variant: "default",
            });

        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to upload video. Please try again.",
                variant: "destructive",
            });
        },
    });


    const handleVideoUpload = () => {
        if (!video) {
            toast({
                title: "Missing Video",
                description: "Please select a video file to upload.",
                variant: "destructive",
            });
            return;
        }

        if (!title.trim() || !description.trim()) {
            toast({
                title: "Incomplete Fields",
                description: "Please provide a title and description for the video.",
                variant: "destructive",
            });
            return;
        }


        if (!user?._id) {
            toast({
                title: "User Not Found",
                description: "Unable to upload video. User not logged in.",
                variant: "destructive",
            });
            return;
        }


        const formData = new FormData();
        formData.append("video", video);
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", user._id); // Pass the userId from Zustand state

        mutation.mutate(formData);

    };


    return (
        <div className="p-6 space-y-6">
            <Typography variant="h2">Your Channel Dashboard</Typography>
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
            <Typography variant="h2">Your Videos</Typography>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="animate-spin w-6 h-6" />
                </div>

            ) : (
                <VideoList videos={videos} />
            )}
        </div>

    );
};

export default ChannelDashboard;
