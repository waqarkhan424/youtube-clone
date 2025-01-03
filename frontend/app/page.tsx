"use client";
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";

interface Video {
  _id: string;
  title: string;
  url: string;
  description: string;
  views: number;
  likes: number;
  uploadedAt: string;
}

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  console.log("videos::::::", videos)
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [sortOption, setSortOption] = useState<string>("latest"); // State for sort option

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos?q=${searchQuery}&sort=${sortOption}`
      );
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [searchQuery, sortOption]); // Re-fetch videos when query or sort option changes

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Videos</h1> */}

      {/* Search Bar */}
      <div className="flex gap-4 mb-4">
        <h1 className="text-2xl font-bold mb-4">Videos</h1>
        <input
          type="text"
          placeholder="Search videos..."
          className="border p-2 rounded-md flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            title={video.title}
            url={video.url}
            description={video.description}
            views={video.views}
            likes={video.likes}
            uploadedAt={video.uploadedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
