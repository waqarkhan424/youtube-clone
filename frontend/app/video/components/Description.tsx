// components/Description.tsx

import React from "react";

interface DescriptionProps {
    views: number;
    uploadedAt: string;
    description: string;
    formatTimeAgo: (timestamp: string) => string;
}

const Description: React.FC<DescriptionProps> = ({
    views,
    uploadedAt,
    description,
    formatTimeAgo,
}) => {
    return (
        <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow">
            <p className="text-gray-700">
                {views} views • {formatTimeAgo(uploadedAt)}
            </p>
            <p className="mt-2 text-gray-700">{description}</p>
        </div>
    );
};

export default Description;
