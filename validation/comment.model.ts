import { object, string, z } from "zod";
import id from "./general/id";

const Comment = object({
  body: string().regex(/(.*?)/).min(16),
  userId: id,
  postId: id,
}).strict();

const CommentUpdate = Comment.omit({
  userId: true
})

export type CommentType = z.infer<typeof Comment>;
export type CommentUpdateType = Omit<CommentType, "userId">

export default Comment;
export { CommentUpdate }