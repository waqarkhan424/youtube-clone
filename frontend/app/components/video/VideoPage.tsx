"use client";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import SearchBar from "@/components/search/SearchBar";
import SignInModal from "@/components/auth/SignInModal";
import UserDropdown from "@/components/dropdown/UserDropdown";
import Loader from "@/components/shared/Loader";
import axios from "axios";
import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";

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
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Videos</h1>

                {/* Search Bar */}
                <div className="flex-grow max-w-lg">
                    <SearchBar />
                </div>

                {/* User Profile or Sign-In */}
                <div>
                    {user ? (
                        <UserDropdown />
                    ) : (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"

                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>


            {/* Sign-In Modal */}
            <SignInModal />

            {/* Video Content */}
            {!user ? (

                <div className="flex items-center justify-center h-[20vh]">
                    <p className="text-gray-500 text-center">
                        Please sign in to view the videos.
                    </p>
                </div>

            ) : isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

