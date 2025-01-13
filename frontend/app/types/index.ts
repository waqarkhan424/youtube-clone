// types/index.ts

export interface Video {
    _id: string;
    title: string;
    url: string;
    description: string;
    thumbnailUrl: string;
    views: number;
    uploadedAt: string;
    userId: string;
    likes: number;
    dislikes: number;
    likedBy: string[];
    dislikedBy: string[];
}

// export interface Comment {
//     _id: string;
//     userId: string;
//     username: string;
//     text: string;
//     postedAt: string;
// }


export interface Comment {
    _id: string;
    userId: string;
    username: string;
    text: string;
    postedAt: string;
    profilePic?: string; // Add optional profilePic
}

export interface Channel {
    channelName: string;
    profilePic: string;
}

export interface User {
    _id?: string; // Because sometimes the store might only have partial data
    username: string;
    channels: Channel[];
}
