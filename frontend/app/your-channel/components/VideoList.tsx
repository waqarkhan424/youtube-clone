import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import VideoCard from "@/app/components/video/VideoCard";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
    const { toast } = useToast();


    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (videoId: string) => {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userVideos'] });
            toast({
                title: "Video Deleted",
                description: "The video was deleted successfully.",
                variant: "default",
            });
            setSelectedVideoId(null); // Clear selection after deletion
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete the video.",
                variant: "destructive",
            });
        },
    });



    const handleDelete = () => {
        if (!selectedVideoId) return;

        toast({
            title: "Confirm Deletion",
            description: "Are you sure you want to delete this video?",
            variant: "default",
            action: (
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(selectedVideoId)} // Trigger the delete mutation
                >
                    Confirm
                </Button>
            ),
        });
    };



    const handleSelect = (videoId: string) => {
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
