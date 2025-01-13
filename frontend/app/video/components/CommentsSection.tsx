// components/CommentsSection.tsx

import React, { useState } from "react";
// import { Comment } from "@/types";
import { Comment } from "@/app/types";

interface CommentsSectionProps {
    currentUserId?: string;
    currentUserProfilePic?: string;
    comments: Comment[];
    onAddComment: (text: string) => void; // callback
    formatTimeAgo: (timestamp: string) => string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
    currentUserId,
    currentUserProfilePic,
    comments,
    onAddComment,
    formatTimeAgo,
}) => {
    const [newComment, setNewComment] = useState<string>("");

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        onAddComment(newComment);
        setNewComment("");
    };

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">{comments.length} Comments</h2>

            {/* New Comment Box */}
            <div className="flex items-start gap-2 mb-6">
                <img
                    src={currentUserProfilePic || "/default-profile.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Comment
                </button>
            </div>

            {/* Existing Comments */}
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment._id} className="flex items-start gap-2">
                        <img
                            src={"/default-profile.png"} // If you want to show each commenter's pic, you'd pass it in or fetch it.
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm">@{comment.username}</p>
                                <p className="text-gray-400 text-xs">
                                    {formatTimeAgo(comment.postedAt)}
                                </p>
                            </div>
                            <p className="text-gray-600 text-sm">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;
