
import React from "react";
import Typography from "@/components/ui/typography";

interface ChannelInfoProps {
    channelName: string;
    profilePicUrl: string;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
    channelName,
    profilePicUrl,
}) => {
    return (
        <div className="flex items-center gap-4 ">
            <img
                src={profilePicUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
                <Typography variant="h3" affects="default">
                    {channelName}
                </Typography>
            </div>
        </div>
    );
};

export default ChannelInfo;
