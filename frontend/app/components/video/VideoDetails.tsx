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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 "
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.293-6.707a1 1 0 011.414 0l5-5a1 1 0 10-1.414-1.414L12 13.586l-1.793-1.793a1 1 0 00-1.414 1.414l3 3z"
                            clipRule="evenodd"
                        />
                    </svg>

                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <p>{views} views</p>
                    <span>•</span>
                    <p>{formatTimeAgo(uploadedAt)}</p>
                </div>

            </div>

            {/* Three-dots menu */}
            <div className="ml-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    focusable="false"
                    aria-hidden="true"
                >
                    <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                </svg>
            </div>

        </div>
    );
};

export default VideoDetails;
