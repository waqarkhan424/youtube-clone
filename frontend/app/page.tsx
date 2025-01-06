"use client";
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { useRouter } from "next/navigation";
import SignInModal from "@/components/SignInModal";
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


interface User {
  username: string;
  email: string;
  profilePic?: string; // Optional
  channelName?: string;
  description?: string;
  channels?: Array<{
    channelName: string;
    description: string;
    profilePic: string;
  }>; // Add channels property
}


const HomePage: React.FC = () => {
  const router = useRouter()

  const [videos, setVideos] = useState<Video[]>([]);
  // console.log("videos::::::", videos)
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // State to store logged-in user info
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // State for dropdown visibility


  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos?q=${searchQuery}`
      );
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Triggered when the search button is clicked
  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchVideos();
    }
  };

  const handleSignInSuccess = (userData: User) => {
    // Save the signed-in user data to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Update the state
    setIsModalOpen(false); // Close the modal
  };



  const handleSignOut = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setUser(null); // Reset user state
  };




  // On component mount, retrieve user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    fetchVideos();
  }, [searchQuery]); // Re-fetch videos when query or sort option changes

  return (
    <div className="p-4">

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold mb-4">Videos</h1>
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded-md flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gray-200 rounded-full flex items-center justify-center"
        >
          🔍
        </button>


        {/* Conditional Render for Sign In Button or Profile Picture */}
        {user ? (
          <div className="relative">
            <img
              src={
                user.channels?.[0]?.profilePic
                  ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${user.channels[0].profilePic}`
                  : "/default-profile.png" // Provide a fallback profile picture if none exists
              }
              alt={`${user.username}'s profile`}
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <div className="p-4">
                  <img
                    src={
                      user.channels?.[0]?.profilePic
                        ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${user.channels[0].profilePic}`
                        : "/default-profile.png"
                    }
                    alt="Profile"
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                  <p className="text-center mt-2 font-bold">{user.username}</p>
                  <p className="text-center text-gray-600 text-sm">{user.email}</p>
                </div>
                <div className="border-t">
                  <button
                    className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                    onClick={() => router.push("/your-channel")} // Redirect to channel page
                  >
                    View Your Channel
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Sign In
          </button>
        )}




      </div>


      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignInSuccess={handleSignInSuccess} // Pass the callback for successful sign-in
      />

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
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
    </div>
  );
};

export default HomePage;
