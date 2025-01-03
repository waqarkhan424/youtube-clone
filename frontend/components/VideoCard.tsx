interface VideoCardProps {
    title: string;
    url: string;
    description: string;
    views: number;
    likes: number;
    uploadedAt: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, url, description, views, likes, uploadedAt }) => {
    return (
        <div className="border p-4 rounded-md shadow-md">
            <video controls className="w-full rounded-md">
                <source src={url} type="video/mp4" />
            </video>
            <h3 className="text-lg font-semibold mt-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="text-sm text-gray-500 mt-2">
                <p>{views} views</p>
                <p>{likes} likes</p>
                <p>Uploaded on {new Date(uploadedAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default VideoCard;
