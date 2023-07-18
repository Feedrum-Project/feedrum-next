import { IUser } from "./User";

export interface IPost
{
    id: number;
    body: string;
    title: string;
    rank: number;
    createdAt: Date | string;
    User: {
        id: number;
        name: string;
        email: string;
        rank: number;
        createdAt: Date;
        isVerified: boolean;
    };
    _count?: {
        Comments: number;
    };
}

export interface IPostId {
    id: number;
    body: string;
    title: string;
    rank: number;
    createdAt: Date | string;
    userId: number;
}

export interface IComment {
    id: number;
    body: string;
    rank: number;
    createdAt: Date | string;
    postId: number;
    userId: number;
}