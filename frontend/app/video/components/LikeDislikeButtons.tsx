
import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

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
            <button onClick={onLike} className="flex items-center gap-1">
                <ThumbsUp className="w-5 h-5" /> <span>{likes}</span>
            </button>

            <button onClick={onDislike} className="flex items-center gap-1">
                <ThumbsDown className="w-5 h-5" /> <span>{dislikes}</span>
            </button>
        </div>

    );
};

export default LikeDislikeButtons;
