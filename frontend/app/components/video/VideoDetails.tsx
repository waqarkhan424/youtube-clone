import { formatDistance } from "date-fns";

interface VideoDetailsProps {
    title: string;
    views: number;
    uploadedAt: string;
    user: {
        username: string;
        channels: Array<{
            channelName: string;
            profilePic: string;
        }>;
    };
}



const VideoDetails: React.FC<VideoDetailsProps> = ({
    title,
    views,
    uploadedAt,
    user,
}) => {


    const formatTimeAgo = (date: string) => {
        const now = new Date();
        const diffInSeconds = Math.round((now.getTime() - new Date(date).getTime()) / 1000);

        if (diffInSeconds < 60) {
            // Handle cases for less than a minute
            return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
        }

        // Fallback to date-fns for larger differences
        const formatted = formatDistance(new Date(date), now, { addSuffix: true });
        return formatted.replace(/^about\s/, ''); // Remove "about" if present
    };

    if (!user || !user.channels?.length) {
        return null; // Return nothing if user or channels are unavailable
    }

    const { channels } = user;
    const { channelName, profilePic } = channels[0];

    const profilePicUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${profilePic}`;


    return (
        <div className="flex mt-2 gap-2 items-start">
            <img
                src={profilePicUrl}
                alt="Channel Profile"
                className="w-9 h-9 rounded-full"
            />
            <div className="flex-1">
                <h3
                    className="text-sm font-semibold overflow-hidden text-ellipsis"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        lineHeight: "1.2em",
                        maxHeight: "2.4em",
                    }}
                >
                    {title}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                    {channelName}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    {views} views • {formatTimeAgo(uploadedAt)}
                </div>

            </div>


        </div>
    );
};

export default VideoDetails;
