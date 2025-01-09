"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import SearchBar from "@/components/search/SearchBar";
import SignInModal from "@/components/auth/SignInModal";
import UserDropdown from "@/components/dropdown/UserDropdown";
import Loader from "@/components/shared/Loader";
import axios from "axios";

interface Video {
    _id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    views: number;
    uploadedAt: string;
}

interface Props {
    initialVideos: Video[];
}

interface User {
    username: string;
    email: string;
    profilePic?: string;
    token: string; // Add token property

}

const fetchVideos = async (searchQuery: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos?q=${searchQuery}`
    );
    return response.data;
};


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

export default function VideoPage({ initialVideos }: Props) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [user, setUser] = useState<User | null>(null);


    const { data: videos = initialVideos, isLoading, refetch } = useQuery({
        queryKey: ["videos", searchQuery],
        queryFn: () => fetchVideos(searchQuery),
        initialData: initialVideos,
        // enabled: false, // Disable automatic fetching
    });

    // Fetch user using React Query
    const { data: user, isError, isLoading: isUserLoading } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });



    const handleSignOut = () => {
        localStorage.removeItem("authToken"); // Remove token

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {}, { withCredentials: true })
            .then(() => {
                window.location.reload();
            });
    };


    // const handleSearch = () => {
    //   refetch();
    // };

    // const handleSignInSuccess = (userData: User) => {
    //     localStorage.setItem("user", JSON.stringify(userData));
    //     setUser(userData);
    //     setIsModalOpen(false);
    // };

    // const handleSignOut = () => {
    //     localStorage.removeItem("user");
    //     setUser(null);
    // };

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);



    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Videos</h1>

                {/* Search Bar */}
                <div className="flex-grow max-w-lg">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        // onSearch={fetchVideos}
                        // onSearch={() => refetch()} // Fetch on button press
                        onSearch={() => { }}
                    />
                </div>

                {/* User Profile or Sign-In */}
                <div>
                    {user ? (
                        <UserDropdown user={user} onSignOut={handleSignOut} />
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
            <SignInModal
                isOpen={isModalOpen}
            // onClose={() => setIsModalOpen(false)}
            // onSignInSuccess={handleSignInSuccess}

            // onSignInSuccess={(user) => {
            //     console.log("User signed in:", user);
            //     // Perform any additional actions like setting user in state or localStorage if needed
            // }}

            // onSignInSuccess={(userData) => {
            //     localStorage.setItem("authToken", userData.token); // Save token
            //     window.location.reload();
            // }}

            // onSignInSuccess={(userData: User) => {
            //     localStorage.setItem("authToken", userData.token); // Save token
            //     window.location.reload();
            // }}

            />

            {/* Video Grid */}
            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video: Video) => (
                        <VideoCard
                            key={video._id}
                            title={video.title}
                            url={video.url}
                            views={video.views}
                            uploadedAt={video.uploadedAt}
                            thumbnailUrl={video.thumbnailUrl}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

