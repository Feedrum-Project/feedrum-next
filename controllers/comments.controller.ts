import InvalidPermissionError from "errors/InvalidPermission";
import NotImplementedError from "errors/NotImplemented";
import ObjectNotFoundError from "errors/ObjectNotFound";

import prisma from "@database";
import { CommentUpdate, CommentUpdateType } from "validation/comment.model";
import PostController from "./post.controller";

export default class CommentController {
    static async get(id: number) {
        const comment = await prisma.comment.getCommentById(id)
        if (comment === null) throw new ObjectNotFoundError("Comment")

        return comment
    }

    static async upvote(id: number) {
        throw new NotImplementedError()
    }

    static async update(id: number, newComment: CommentUpdateType, userId: number) {
        const comment = await this.get(id);
        if (comment.userId !== userId) throw new InvalidPermissionError();

        await CommentUpdate.parseAsync(newComment);

        return prisma.comment.updateCommentById(id, newComment);
    }

    static async create(newComment: CommentUpdateType, userId: number) {
        await CommentUpdate.parseAsync(newComment);

        const post = await PostController.get(newComment.postId)
        const comment = await prisma.comment.createComment(newComment, userId, post.id)

        return comment
    }

    static async delete(id: number, userId: number) {
        const comment = await this.get(id);
        if (comment.userId !== userId) throw new InvalidPermissionError();

        await prisma.comment.deleteCommentById(id);

        return comment;
    }
}
