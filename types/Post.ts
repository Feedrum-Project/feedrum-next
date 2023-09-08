import { IUser } from "./User";
import ITag, { Tag } from "./Tag";

export type role = "ADMIN" | "USER" | "BANNED";

export interface IPost {
  id: number;
  body: string;
  title: string;
  rank: number;
  createdAt: Date | string;
  User?: {
    id: number;
    name: string;
    email?: string;
    rank: number;
    createdAt?: Date;
    isVerified?: boolean;
    role: role;
  };
  Tags?: ITag[];
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
  userId?: number;
  User: {
    id: number;
    name: string;
    role?: role;
    rank?: number;
  };
  Tags?: Tag;
  _count?: {
    Comments: number;
  };
}

export interface IComment {
  id: number;
  body: string;
  rank: number;
  createdAt: Date | string;
  User: IUser;
  Post: IPost;
}

export interface lightPost {
  id: number;
  title: string;
  rank: number;
  _count?: {
    Comments: number;
  }
}