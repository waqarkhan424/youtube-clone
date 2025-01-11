import VideoThumbnail from "./VideoThumbnail";
import VideoDetails from "./VideoDetails";

interface VideoCardProps {
    title: string;
    url: string;
    thumbnailUrl: string;
    views: number;
    uploadedAt: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, url, thumbnailUrl, views, uploadedAt }) => {
    return (
        <div className="max-w-xs">
            <VideoThumbnail
                thumbnailUrl={thumbnailUrl}
                videoUrl={url}
                title={title}
            />
            <VideoDetails
                title={title}
                views={views}
                uploadedAt={uploadedAt}
            />
        </div>
    );
};

export default VideoCard;
