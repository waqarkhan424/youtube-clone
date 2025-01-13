
import React from "react";

interface LikeDislikeButtonsProps {
    likes: number;
    dislikes: number;
    isLiked: boolean;
    isDisliked: boolean;
    onLike: () => void;
    onDislike: () => void;
}

const LikeDislikeButtons: React.FC<LikeDislikeButtonsProps> = ({
    likes,
    dislikes,
    isLiked,
    isDisliked,
    onLike,
    onDislike,
}) => {
    return (
        <div className="flex items-center gap-4">
            <button
                className={`flex items-center gap-1 ${isLiked ? "text-blue-600" : "text-blue-500"
                    }`}
                onClick={onLike}
            >
                👍 <span>{likes}</span>
            </button>

            <button
                className={`flex items-center gap-1 ${isDisliked ? "text-red-600" : "text-red-500"
                    }`}
                onClick={onDislike}
            >
                👎 <span>{dislikes}</span>
            </button>
        </div>
    );
};

export default LikeDislikeButtons;
