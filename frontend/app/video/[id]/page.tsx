"use client";

import React, { useState, useEffect } from "react";
import { useVideoDetails } from "@/app/hooks/useVideoDetails";
import VideoPlayer from "../components/VideoPlayer";
import ChannelInfo from "../components/ChannelInfo";
import LikeDislikeButtons from "../components/LikeDislikeButtons";
import Description from "../components/Description";
import CommentsSection from "../components/CommentsSection";
import SuggestedVideosCard from "../components/SuggestedVideosCard";
import { formatTimeAgo } from "@/lib/utils"; // or wherever your util is
import Typography from "@/components/ui/typography";
import SearchBar from "@/components/search/SearchBar";
import UserDropdown from "@/components/dropdown/UserDropdown";

export default function VideoDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [videoId, setVideoId] = useState<string | null>(null);

    // Unwrap params (assuming it's a Promise from the Next.js dynamic route)
    useEffect(() => {
        params.then(({ id }) => {
            setVideoId(id);
        });
    }, [params]);

    // Use the custom hook
    const {
        isLoading,
        video,
        uploader,
        comments,
        otherVideos,
        currentUserId,
        currentUserProfilePic,
        handleLike,
        handleDislike,
        handleAddComment,
    } = useVideoDetails(videoId);

    if (isLoading || !video) {
        return <p>Loading...</p>;
    }

    // If there's no uploader or channels, you can return a fallback
    if (!uploader || !uploader.channels?.length) {
        return null;
    }

    // Extract channel info
    const { channels } = uploader;
    const { channelName, profilePic } = channels[0];
    const profilePicUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${profilePic}`;

    // Determine if current user liked or disliked
    const isLiked = video.likedBy.includes(currentUserId || "");
    const isDisliked = video.dislikedBy.includes(currentUserId || "");




    return (
        <div>



            <div className="flex justify-between items-center py-2 px-4">

                <div className="flex items-center gap-2">
                    <img
                        src="/YouTube-Logo.wine.svg"
                        alt="YouTube Logo"
                        className="w-24 h-auto"
                    />
                </div>

                <div className="flex-grow max-w-lg">
                    <SearchBar />
                </div>

                <div>
                    <UserDropdown />

                </div>
            </div>



            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row gap-8">

                {/* Main Video Section */}
                <div className="flex-1">
                    <VideoPlayer
                        videoUrl={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${video.url}`}
                        title={video.title}

                    />
                    <Typography variant="h2" className="mt-4">{video.title}</Typography>
                    <div className="flex items-center justify-between mt-4">
                        <ChannelInfo channelName={channelName} profilePicUrl={profilePicUrl} />
                        <LikeDislikeButtons
                            likes={video.likes}
                            dislikes={video.dislikes}
                            isLiked={isLiked}
                            isDisliked={isDisliked}
                            onLike={handleLike}
                            onDislike={handleDislike}
                        />
                    </div>

                    <Description
                        views={video.views}
                        uploadedAt={video.uploadedAt}
                        description={video.description}
                        formatTimeAgo={formatTimeAgo}
                    />

                    <CommentsSection
                        currentUserId={currentUserId}
                        currentUserProfilePic={currentUserProfilePic}
                        comments={comments}
                        onAddComment={handleAddComment}
                        formatTimeAgo={formatTimeAgo}
                    />
                </div>

                {/* Suggested Videos Section */}
                <div className="w-full md:w-2/5">
                    <div className="space-y-4">
                        {otherVideos.map((otherVideo) => (
                            <SuggestedVideosCard
                                key={otherVideo._id}
                                title={otherVideo.title}
                                url={otherVideo.url}
                                views={otherVideo.views}
                                uploadedAt={otherVideo.uploadedAt}
                                thumbnailUrl={otherVideo.thumbnailUrl}
                                userId={otherVideo.userId}
                            />
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
}
