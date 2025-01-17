"use client";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import SearchBar from "@/components/search/SearchBar";
import SignInModal from "@/components/auth/SignInModal";
import UserDropdown from "@/components/dropdown/UserDropdown";
import { Loader2 } from "lucide-react";
import axios from "axios";
import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface Video {
    _id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    views: number;
    uploadedAt: string;
    userId: string; // User ID associated with the video

}


interface Props {
    initialVideos: Video[];
}


const fetchVideos = async (searchQuery: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos?q=${searchQuery}`
    );
    return response.data;
};

export default function VideoPage({ initialVideos }: Props) {
    const router = useRouter();


    const fetchUser = useStore((state) => state.fetchUser);

    const user = useStore((state) => state.user);

    const setIsModalOpen = useStore((state) => state.setIsModalOpen);


    // Fetch user on component mount
    useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

    const { data: videos = initialVideos, isLoading } = useQuery({
        queryKey: ["videos", useStore.getState().searchQuery], // Zustand's searchQuery state
        queryFn: () => fetchVideos(useStore.getState().searchQuery),
        initialData: initialVideos,
    });


    const handleVideoClick = (videoId: string) => {
        router.push(`/video/${videoId}`); // Navigate to the video details page
    };

    return (
        <div className="p-2 px-4">
            <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-2">
                    <img
                        src="/YouTube-Logo.wine.svg"
                        alt="YouTube Logo"
                        className="w-24 h-auto"
                    />
                </div>


                {/* Search Bar */}
                <div className="flex-grow max-w-lg">
                    <SearchBar />
                </div>

                {/* User Profile or Sign-In */}
                <div>
                    {user ? (
                        <UserDropdown />
                    ) : (
                        <Button
                            variant="ghost"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            </div>


            {/* Sign-In Modal */}
            <SignInModal />

            {/* Video Content */}
            {!user ? (

                <Card className="max-w-lg mx-auto mt-10 shadow-2xl">
                    <CardContent className="text-center p-8">
                        <CardTitle className="mb-4">
                            Please sign in to view the videos.
                        </CardTitle>
                        <CardDescription>
                            Start watching videos to help us build a feed of videos you&apos;ll love.
                        </CardDescription>
                    </CardContent>
                </Card>

            ) : isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="animate-spin w-6 h-6" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-10">
                    {videos.map((video: Video) => (

                        <div key={video._id} onClick={() => handleVideoClick(video._id)}>
                            <VideoCard
                                title={video.title}
                                url={video.url}
                                views={video.views}
                                uploadedAt={video.uploadedAt}
                                thumbnailUrl={video.thumbnailUrl}
                                userId={video.userId}
                            />
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
};

