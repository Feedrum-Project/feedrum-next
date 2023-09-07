export default interface ITag {
  postId: number;
  tagId: number;
}

export interface ITagName {
  name: string;
  id: number;
}

export type Tag = string[] | null;
