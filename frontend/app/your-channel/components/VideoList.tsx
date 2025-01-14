import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import VideoCard from "@/app/components/video/VideoCard";
import { Button } from '@/components/ui/button';

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

interface VideoListProps {
    videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null); // State for selected video ID


    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (videoId: string) => {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userVideos'] });
            alert('Video deleted successfully!');
            setSelectedVideoId(null); // Clear selection after deletion
        },
        onError: () => {
            alert('Failed to delete the video.');
        },
    });


    const handleDelete = () => {
        if (selectedVideoId && confirm('Are you sure you want to delete this video?')) {
            deleteMutation.mutate(selectedVideoId);
        }
    };


    const handleSelect = (videoId: string) => {
        // Toggle selection: deselect if the same video is clicked again
        setSelectedVideoId((prevSelected) => (prevSelected === videoId ? null : videoId));
    };

    return (

        <div>
            {/* Video Grid */}
            < div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                {
                    videos.map((video) => (
                        <div
                            key={video._id}
                            className={`relative border-2 ${selectedVideoId === video._id ? 'border-blue-500' : 'border-transparent'}`}
                            onClick={() => handleSelect(video._id)} // Select or deselect video on click
                        >
                            <VideoCard
                                title={video.title}
                                url={video.url}
                                views={video.views}
                                uploadedAt={video.uploadedAt}
                                thumbnailUrl={video.thumbnailUrl}
                                userId={video.userId}
                            />
                        </div>
                    ))
                }
            </div>


            {/* Delete Button */}
            < div className="flex justify-center mt-4" >
                <Button
                    onClick={handleDelete}
                    variant="destructive"
                    disabled={!selectedVideoId} // Disable button if no video is selected
                >
                    Delete Selected Video
                </Button>

            </div >
        </div>


    );
};

export default VideoList;
