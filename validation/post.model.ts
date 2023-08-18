import refine from "helpers/validation.helper";
import { CustomErrorParams, object, string, z } from "zod";
import id from "./general/id";

const Post = object({
    body: string().regex(/(.*?)/).min(8).max(2048),
    userId: id,
    title: string().regex(/(.*?)/).min(8).max(64),
}).strict();

const PostUpdate = Post.omit({
    userId: true,
})
    .partial()
    .refine(...refine(["body", "title"]));
export type PostType = z.infer<typeof Post>;
export type PostUpdateType = Omit<PostType, "userId">;

export default Post;
export { PostUpdate };
