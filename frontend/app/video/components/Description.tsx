
import React, { useState } from "react";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

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
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription((prev) => !prev);
    };

    return (
        <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            className="p-4 mt-4 rounded-lg"
        >

            <Typography variant="h4" size="sm">
                {views} views • {formatTimeAgo(uploadedAt)}
            </Typography>

            {/* Description */}
            <Typography
                variant="p"
                affects="default"
                className="mt-2"
            >

                {showFullDescription ? (
                    <>
                        {description}
                        <Button
                            variant="ghost"
                            onClick={toggleDescription}
                            className="px-1"

                        >
                            Show less
                        </Button>
                    </>
                ) : (
                    <>
                        {description.slice(0, 230)}...
                        <Button
                            variant="ghost"
                            onClick={toggleDescription}
                            className="px-1"
                        >
                            more
                        </Button>
                    </>
                )}




            </Typography>


        </div>
    );
};

export default Description;
