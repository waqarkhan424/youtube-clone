import { formatTimeAgo } from "@/lib/utils";
import Typography from "@/components/ui/typography";
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

                <Typography
                    variant="h4"
                    size="md"
                    affects="default"
                    className="line-clamp-2 break-words"
                >
                    {title}
                </Typography>


                <Typography
                    variant="p"
                    affects="description"
                >
                    {channelName}
                </Typography>

                <Typography
                    variant="p"
                    affects="muted"
                >
                    {views} views • {formatTimeAgo(uploadedAt)}
                </Typography>

            </div>


        </div>
    );
};

export default VideoDetails;
