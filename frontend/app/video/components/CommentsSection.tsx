
import React, { useState } from "react";
import { Comment } from "@/app/types";
import Typography from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CommentsSectionProps {
    currentUserId?: string;
    currentUserProfilePic?: string;
    comments: Comment[];
    onAddComment: (text: string) => void; // callback
    formatTimeAgo: (timestamp: string) => string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
    // currentUserId,
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
            <Typography variant="h2" className=" mb-4">{comments.length} Comments</Typography>

            {/* New Comment Box */}
            <div className="flex items-start gap-2 mb-6">
                <img
                    src={currentUserProfilePic || "/default-profile.png"}
                    alt="Profile"
                    className="w-9 h-9 rounded-full"
                />
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
                <Button onClick={handleAddComment} variant="secondary">
                    Comment
                </Button>
            </div>

            {/* Existing Comments */}
            <div className="space-y-10">
                {comments.map((comment, index) => {

                    // Use _id as the key or fallback to index if _id is not available
                    const key = comment._id || `comment-${index}`
                    return (
                        <div key={key} className="flex items-start gap-2">
                            <img
                                src={
                                    comment.profilePic
                                        ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${comment.profilePic}`
                                        : "/default-profile.png"
                                }
                                alt={comment.username}
                                className="w-9 h-9 rounded-full"
                            />
                            <div>
                                <div className="flex items-center gap-2">

                                    <Typography variant="p" size="sm" className="font-semibold">
                                        @{comment.username}
                                    </Typography>

                                    <Typography variant="p" size="xs">
                                        {formatTimeAgo(comment.postedAt)}
                                    </Typography>

                                </div>
                                <Typography variant="p" size="sm" className="font-normal">
                                    {comment.text}
                                </Typography>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommentsSection;
