// "use client";
// import { useEffect, useState } from "react";
// import SuggestedVideosCard from "../components/SuggestedVideosCard";
// import { formatTimeAgo } from "@/lib/utils";
// import axios from "axios";
// import useStore from "@/store/useStore";

// interface Video {
//     _id: string;
//     title: string;
//     url: string;
//     description: string;
//     thumbnailUrl: string;
//     views: number;
//     uploadedAt: string;
//     userId: string;
//     likes: number;
//     dislikes: number;
//     likedBy: string[];
//     dislikedBy: string[];
// }


// interface Comment {
//     _id: string;
//     userId: string;
//     username: string;
//     text: string;
//     postedAt: string;
// }
// interface User {
//     username: string;
//     channels: Array<{
//         channelName: string;
//         profilePic: string;
//     }>;
// }

// export default function VideoDetailsPage({ params }: { params: Promise<{ id: string }> }) {

//     const [id, setId] = useState<string | null>(null); // Extracted video ID
//     const [video, setVideo] = useState<Video | null>(null);
//     const [otherVideos, setOtherVideos] = useState<Video[]>([]);
//     const [uploader, setUploader] = useState<User | null>(null); // Renamed to avoid confusion with authenticated user

//     const [comments, setComments] = useState<Comment[]>([]);
//     const [newComment, setNewComment] = useState<string>("");

//     const { user: currentUser, fetchUser } = useStore(); // Zustand store for current user

//     useEffect(() => {
//         // Fetch the authenticated user when the app initializes
//         fetchUser();
//     }, [fetchUser]);


//     useEffect(() => {
//         // Unwrap the Promise from params
//         params.then((resolvedParams) => {
//             const { id: videoId } = resolvedParams;
//             setId(videoId); // Set the video ID for further use


//             // 1. Fetch the selected video by ID
//             axios
//                 .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}`)
//                 .then((response) => {
//                     setVideo(response.data);


//                     // 1a. Increment views once we have the video
//                     axios
//                         .patch(
//                             `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}/views`,
//                             {},
//                             { withCredentials: true }
//                         )
//                         .then((viewsResponse) => {
//                             // If you want the updated view count from the response, do:
//                             setVideo(viewsResponse.data);
//                         })
//                         .catch((error) => console.error("Error incrementing views:", error));


//                     // 2. Fetch user details based on video.userId
//                     axios
//                         .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/${response.data.userId}`)
//                         .then((userResponse) => setUploader(userResponse.data))
//                         .catch((error) => console.error("Error fetching user:", error));


//                     // 3. Fetch comments for the video
//                     axios
//                         .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${videoId}/comments`)
//                         .then((commentResponse) => setComments(commentResponse.data))
//                         .catch((error) => console.error("Error fetching comments:", error));

//                 })
//                 .catch((error) => console.error("Error fetching video:", error));

//             // 4. Fetch all videos, exclude the current one
//             axios
//                 .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`)
//                 .then((response) => {
//                     const filteredVideos = response.data.filter((v: Video) => v._id !== videoId);
//                     setOtherVideos(filteredVideos);
//                 })
//                 .catch((error) => console.error("Error fetching other videos:", error));
//         });
//     }, [params]);

//     if (!video) return <p>Loading...</p>;


//     if (!uploader || !uploader.channels?.length) return null;


//     const { channels } = uploader;
//     const { channelName, profilePic } = channels[0];

//     // Safely construct the uploader's profilePic URL
//     const profilePicUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${profilePic}`;

//     const currentUserId = currentUser?._id; // Get authenticated user's ID from Zustand store



//     const handleLike = async () => {
//         if (!currentUserId) return; // Ensure user is authenticated
//         const response = await axios.patch(
//             `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${id}/like`, // Updated URL
//             { userId: currentUserId },
//             { withCredentials: true }
//         );
//         setVideo(response.data);
//     };




//     const handleDislike = async () => {
//         if (!currentUserId) return; // Ensure user is authenticated
//         const response = await axios.patch(
//             `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${id}/dislike`, // Updated URL
//             { userId: currentUserId },
//             { withCredentials: true }
//         );
//         setVideo(response.data);
//     };



//     const handleAddComment = async () => {
//         if (!newComment.trim() || !currentUserId) return; // Ensure the comment is valid
//         try {
//             const response = await axios.post(
//                 `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/${id}/comment`,
//                 { userId: currentUserId, text: newComment },
//                 { withCredentials: true }
//             );
//             setComments([response.data, ...comments]); // Add the new comment to the list
//             setNewComment(""); // Clear input field
//         } catch (error) {
//             console.error("Error adding comment:", error);
//         }
//     };



//     const isLiked = video.likedBy.includes(currentUserId || "");
//     const isDisliked = video.dislikedBy.includes(currentUserId || "");



//     return (

//         <div className="flex flex-col md:flex-row gap-8 p-4">
//             {/* Main Video Section */}
//             <div className="flex-1">
//                 <video
//                     controls
//                     className="w-full rounded-lg shadow-lg"
//                     src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${video.url}`}
//                 ></video>
//                 <h1 className="text-2xl font-bold mt-4">{video.title}</h1>

//                 {/* Channel Info and Like/Dislike Section */}
//                 <div className="flex items-center gap-4 mt-4">
//                     <img
//                         src={profilePicUrl}
//                         alt="Profile"
//                         className="w-12 h-12 rounded-full"
//                     />
//                     <div className="flex-1">
//                         <h2 className="text-lg font-semibold">{channelName}</h2>
//                     </div>
//                     <div className="flex items-center gap-4">

//                         <button
//                             className={`flex items-center gap-1 ${isLiked ? "text-blue-600" : "text-blue-500"
//                                 }`}
//                             onClick={handleLike}
//                         >

//                             👍 <span>{video.likes}</span>
//                         </button>

//                         <button
//                             className={`flex items-center gap-1 ${isDisliked ? "text-red-600" : "text-red-500"
//                                 }`}
//                             onClick={handleDislike}
//                         >

//                             👎 <span>{video.dislikes}</span>
//                         </button>
//                     </div>
//                 </div>



//                 {/* Styled Description */}
//                 <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow">
//                     <p className="text-gray-700">
//                         {video.views} views • {formatTimeAgo(video.uploadedAt)}
//                     </p>
//                     <p className="mt-2 text-gray-700">
//                         {video.description}
//                     </p>

//                 </div>




//                 {/* Comment Section */}
//                 <div className="mt-6">
//                     <h2 className="text-lg font-semibold mb-4">{comments.length} Comments</h2>
//                     <div className="flex items-start gap-2 mb-6">
//                         <img
//                             src={
//                                 currentUser?.channels?.[0]?.profilePic
//                                     ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${currentUser.channels[0].profilePic}`
//                                     : "/default-profile.png"
//                             }
//                             alt="Profile"
//                             className="w-10 h-10 rounded-full"
//                         />
//                         <div className="flex-1">
//                             <input
//                                 type="text"
//                                 placeholder="Add a comment..."
//                                 className="w-full border border-gray-300 rounded-lg p-2"
//                                 value={newComment}
//                                 onChange={(e) => setNewComment(e.target.value)}
//                             />
//                         </div>
//                         <button
//                             onClick={handleAddComment}
//                             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                         >
//                             Comment
//                         </button>
//                     </div>
//                     <div className="space-y-4">
//                         {comments.map((comment) => (
//                             <div key={comment._id} className="flex items-start gap-2">
//                                 <img
//                                     src={
//                                         // If the commenter is the currentUser, show their profile pic
//                                         comment.userId === currentUserId && currentUser?.channels?.[0]?.profilePic
//                                             ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${currentUser.channels[0].profilePic}`
//                                             : "/default-profile.png"
//                                     }
//                                     alt="Profile"
//                                     className="w-10 h-10 rounded-full"
//                                 />
//                                 <div>
//                                     {/* Wrap username and time in a flex container */}
//                                     <div className="flex items-center gap-2">
//                                         <p className="font-semibold text-sm">@{comment.username}</p>
//                                         <p className="text-gray-400 text-xs">{formatTimeAgo(comment.postedAt)}</p>
//                                     </div>

//                                     {/* Comment text below */}
//                                     <p className="text-gray-600 text-sm">{comment.text}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>



//             {/* Suggested Videos Section */}
//             <div className="w-full md:w-1/3">
//                 <h2 className="text-lg font-semibold mb-4">Suggested Videos</h2>
//                 <div className="space-y-4">
//                     {otherVideos.map((otherVideo) => (
//                         <SuggestedVideosCard
//                             key={otherVideo._id}
//                             title={otherVideo.title}
//                             url={otherVideo.url}
//                             views={otherVideo.views}
//                             uploadedAt={otherVideo.uploadedAt}
//                             thumbnailUrl={otherVideo.thumbnailUrl}
//                             userId={otherVideo.userId}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>





//     );
// }

////////////////////////////////////////////////////////////////////////////


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

        currentUserProfilePic, // Use this here

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

    // // For CommentsSection current user pic
    // const currentUserProfilePic = uploader._id === currentUserId
    //     ? profilePicUrl
    //     : "/default-profile.png";

    // console.log("currentUserProfilePic::::::::", currentUserProfilePic)
    // console.log("currentUserId::::::::", currentUserId)
    // console.log("uploader._id ::::::::", uploader._id)



    return (
        <div className="flex flex-col md:flex-row gap-8 p-4">
            {/* Main Video Section */}
            <div className="flex-1">
                <VideoPlayer
                    videoUrl={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${video.url}`}
                    title={video.title}
                />
                <h1 className="text-2xl font-bold mt-4">{video.title}</h1>

                <div className="flex items-center justify-between">
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
            <div className="w-full md:w-1/3">
                <h2 className="text-lg font-semibold mb-4">Suggested Videos</h2>
                {/* <SuggestedVideosCard videos={otherVideos} /> */}

                {/* //////////////// */}
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


                {/* //////////////////// */}

            </div>
        </div>
    );
}
