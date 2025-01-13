// components/ChannelInfo.tsx

import React from "react";

interface ChannelInfoProps {
    channelName: string;
    profilePicUrl: string;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
    channelName,
    profilePicUrl,
}) => {
    return (
        <div className="flex items-center gap-4 mt-4">
            <img
                src={profilePicUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{channelName}</h2>
            </div>
        </div>
    );
};

export default ChannelInfo;
