import VideoCard from "@/app/components/video/VideoCard";

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

interface VideoListProps {
    videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
    return (
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
    );
};

export default VideoList;
