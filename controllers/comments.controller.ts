import InvalidBodyError from "errors/InvalidBody";
import InvalidPermissionError from "errors/InvalidPermission";
import NotImplementedError from "errors/NotImplemented";
import ObjectNotFoundError from "errors/ObjectNotFound";

import client from "helpers/database";
import JwtUser from "types/JwtUser";
import { CommentType, CommentUpdate, CommentUpdateType } from "validation/comment.model";
import { PostType } from "validation/post.model";
import PostController from "./post.controller";

export default class CommentController {
    static async get(id: number) {
        const comment = await client.comment.getCommentById(id)
        if (comment === null) throw new ObjectNotFoundError("Comment")

        return comment
    }

    static async upvote(id: number) {
        throw new NotImplementedError()
    }

    static async update(id: number, newComment: CommentUpdateType, userId: number) {
        const comment = await this.get(id);
        if (comment.userId !== userId) throw new InvalidPermissionError();

        const commentValidation = await CommentUpdate.spa(newComment);
        if (!commentValidation.success) throw new InvalidBodyError(commentValidation.error);

        return client.comment.updateCommentById(id, newComment);
    }

    static async create(newComment: CommentUpdateType, userId: number) {
        const validation = await CommentUpdate.spa(newComment);
        if (!validation.success) throw new InvalidBodyError(validation.error);

        const post = await PostController.get(newComment.postId)
        const comment = await client.comment.createComment(newComment, userId, post.id)

        return comment
    }

    static async delete(id: number, userId: number) {
        const comment = await this.get(id);
        if (comment.userId !== userId) throw new InvalidPermissionError();

        await client.comment.deleteCommentById(id);

        return comment;
    }
}
