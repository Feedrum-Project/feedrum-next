import { Post } from "@prisma/client";
import { IUser } from "./User";
import ITag from "./Tag";

export interface IPost {
  id: number;
  body: string;
  title: string;
  rank: number;
  createdAt: Date | string;
  User?: {
    id: number;
    name: string;
    email: string;
    rank: number;
    createdAt: Date;
    isVerified: boolean;
  };
  Tags?: ITag[] | null;
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
  User: {
    id: number;
    name: string;
  };
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
  Post: Post;
}

export interface lightPost {
  id: number;
  title: string;
  rank: number;
  _count?: {
    Comments: number;
  }
}