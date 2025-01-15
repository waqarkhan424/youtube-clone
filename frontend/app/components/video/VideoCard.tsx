import VideoThumbnail from "./VideoThumbnail";
import VideoDetails from "./VideoDetails";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface VideoCardProps {
    title: string;
    url: string;
    thumbnailUrl: string;
    views: number;
    uploadedAt: string;
    userId: string; // User ID associated with the video

}


const fetchUserDetails = async (userId: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/${userId}`
    );
    return response.data;
};

const VideoCard: React.FC<VideoCardProps> = ({ title, url, thumbnailUrl, views, uploadedAt, userId }) => {


    const { data: user, isLoading } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUserDetails(userId),
        enabled: !!userId,
    });




    return (
        // <div className="max-w-xs">
        <div>
            <VideoThumbnail
                thumbnailUrl={thumbnailUrl}
                videoUrl={url}
                title={title}
            />

            {isLoading ? null : (
                <VideoDetails
                    title={title}
                    views={views}
                    uploadedAt={uploadedAt}
                    user={user}
                />
            )}


        </div>
    );
};

export default VideoCard;
