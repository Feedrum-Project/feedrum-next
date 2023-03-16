export interface IPost {
  id: number;
  body: string;
  title: string;
  rank: number;
  createdAt: Date | string;
  userId: number;
};

export interface IComment {
  id: number;
  body: string;
  rank: number;
  createdAt: Date | string;
  postId: number;
  userId: number;
}