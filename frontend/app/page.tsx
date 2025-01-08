// "use client";
// import { useQuery } from "@tanstack/react-query";
// ////////

// import { useEffect, useState } from "react";
// import VideoCard from "./components/video/VideoCard";
// import SearchBar from "@/components/search/SearchBar"; // Refactored SearchBar
// import SignInModal from "@/components/auth/SignInModal";
// import UserDropdown from "@/components/dropdown/UserDropdown"; // New UserDropdown
// import Loader from "@/components/shared/Loader"; // New Loader
// import axios from "axios";

// interface Video {
//   _id: string;
//   title: string;
//   url: string;
//   thumbnailUrl: string;
//   views: number;
//   uploadedAt: string;
// }

// interface User {
//   username: string;
//   email: string;
//   profilePic?: string;
// }


// const fetchVideos = async (searchQuery: string) => {
//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos?q=${searchQuery}`
//   );
//   return response.data;
// };

// const HomePage: React.FC = () => {
//   // const [videos, setVideos] = useState<Video[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   // const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);


//   const { data: videos, isLoading } = useQuery({
//     queryKey: ["videos", searchQuery],
//     queryFn: () => fetchVideos(searchQuery),
//     // enabled: false, // Disable automatic fetching
//   });

//   // const handleSearch = () => {
//   //   refetch();
//   // };

//   // const fetchVideos = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     const response = await axios.get(
//   //       `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos?q=${searchQuery}`
//   //     );
//   //     setVideos(response.data);
//   //   } catch (error) {
//   //     console.error("Error fetching videos:", error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleSignInSuccess = (userData: User) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//     setIsModalOpen(false);
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);



//   // useEffect(() => {
//   //   fetchVideos();
//   // }, [searchQuery]);

//   return (
//     <div className="p-4">

//       {/* Header Row */}
//       <div className="flex justify-between items-center mb-4">
//         {/* Heading */}
//         <h1 className="text-2xl font-bold">Videos</h1>

//         {/* Search Bar */}
//         <div className="flex-grow max-w-lg">
//           <SearchBar
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             // onSearch={fetchVideos}
//             onSearch={() => { }}
//           />
//         </div>

//         {/* User Profile or Sign-In */}

//         <div>
//           {user ? (
//             <UserDropdown user={user} onSignOut={handleSignOut} />
//           ) : (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md"

//             >
//               Sign In
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Sign-In Modal */}
//       <SignInModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSignInSuccess={handleSignInSuccess}
//       />

//       {/* Video Grid */}
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {videos.map((video: Video) => (
//             <VideoCard
//               key={video._id}
//               title={video.title}
//               url={video.url}
//               views={video.views}
//               uploadedAt={video.uploadedAt}
//               thumbnailUrl={video.thumbnailUrl}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;







////////////////////////////////////////////
"use server"

import VideoPage from "./components/video/VideoPage";

export const metadata = {
  title: "YouTube Clone",
  description: "Discover videos",
};

async function fetchInitialVideos() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`, {
    cache: "no-store", // Optional: Prevent caching for fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  return response.json();

}

export default async function Page() {
  const initialVideos = await fetchInitialVideos();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {/* Pass initial data to the client-side component */}
      <VideoPage initialVideos={initialVideos} />
    </div>

  );
}
