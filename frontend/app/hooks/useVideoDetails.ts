// hooks/useVideoDetails.ts

import { useEffect, useState } from "react";
import axios from "axios";
// import { Video, User, Comment } from "@/types";
import { Video, User, Comment } from "../types";
import useStore from "@/store/useStore";

interface UseVideoDetailsResult {
    isLoading: boolean;
    video: Video | null;
    uploader: User | null;
    comments: Comment[];
    otherVideos: Video[];
    currentUserId: string | undefined;
    currentUserProfilePic: string;
    handleLike: () => Promise<void>;
    handleDislike: () => Promise<void>;
    handleAddComment: (text: string) => Promise<void>;
}

export function useVideoDetails(videoId: string | null): UseVideoDetailsResult {
    const [video, setVideo] = useState<Video | null>(null);
    const [uploader, setUploader] = useState<User | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [otherVideos, setOtherVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user: currentUser, fetchUser } = useStore();
    const currentUserId = currentUser?._id;

    const currentUserProfilePic = currentUser?.channels?.[0]?.profilePic
        ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${currentUser.channels[0].profilePic}`
        : "/default-profile.png"



    useEffect(() => {
        // Fetch the authenticated user when the app initializes
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (!videoId) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);

                // 1. Fetch the selected video by ID
                const videoResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}`
                );

                const fetchedVideo: Video = videoResponse.data;
                setVideo(fetchedVideo);

                // 1a. Increment views once we have the video
                try {
                    const viewsResponse = await axios.patch(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}/views`,
                        {},
                        { withCredentials: true }
                    );
                    setVideo(viewsResponse.data); // updated view count
                } catch (error) {
                    console.error("Error incrementing views:", error);
                }

                // 2. Fetch user details based on video.userId
                try {
                    const userResponse = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/${fetchedVideo.userId}`
                    );
                    setUploader(userResponse.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }

                // 3. Fetch comments for the video
                try {
                    const commentResponse = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}/comments`
                    );
                    setComments(commentResponse.data);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                }

                // 4. Fetch all videos, exclude the current one
                try {
                    const allVideosResponse = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`
                    );
                    const filteredVideos = allVideosResponse.data.filter(
                        (v: Video) => v._id !== videoId
                    );
                    setOtherVideos(filteredVideos);
                } catch (error) {
                    console.error("Error fetching other videos:", error);
                }
            } catch (error) {
                console.error("Error fetching video:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [videoId]);

    const handleLike = async () => {
        if (!currentUserId || !videoId) return;
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}/like`,
                { userId: currentUserId },
                { withCredentials: true }
            );
            setVideo(response.data);
        } catch (error) {
            console.error("Error liking video:", error);
        }
    };

    const handleDislike = async () => {
        if (!currentUserId || !videoId) return;
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}/dislike`,
                { userId: currentUserId },
                { withCredentials: true }
            );
            setVideo(response.data);
        } catch (error) {
            console.error("Error disliking video:", error);
        }
    };

    const handleAddComment = async (text: string) => {
        if (!text.trim() || !currentUserId || !videoId) return;
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}/comment`,
                { userId: currentUserId, text },
                { withCredentials: true }
            );
            setComments([response.data, ...comments]);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return {
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
    };
}
