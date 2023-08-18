import InvalidPermissionError from "errors/InvalidPermission";
import ObjectNotFoundError from "errors/ObjectNotFound";
import MissingVoteError from "errors/MissingVote";
import YourVoteError from "errors/YourVote";

import { CommentUpdate, CommentUpdateType } from "validation/comment.model";
import scores from "validation/general/voteScore";
import prisma from "@database";
import PostController from "./post.controller";
import { VoteScore } from "@prisma/client";

export default class CommentController {
    static async get(id: number) {
        const comment = await prisma.comment.getCommentById(id);
        if (comment === null) throw new ObjectNotFoundError("Comment");

        return comment;
    }

    static async vote(id: number, userId: number, score: VoteScore) {
        await scores.parseAsync(score);
        const comment = await this.get(id);

        if (comment.userId === userId) throw new YourVoteError();

        return prisma.comment.voteComment(id, userId, score);
    }

    static async unvote(id: number, userId: number) {
        await this.get(id);

        const isUserVoted = await prisma.comment.isUserVoted(id, userId);
        if (!isUserVoted) throw new MissingVoteError();

        return prisma.post.deleteVote(id, userId);
    }

    static async update(
        id: number,
        newComment: CommentUpdateType,
        userId: number,
    ) {
        const comment = await this.get(id);
        if (comment.userId !== userId) throw new InvalidPermissionError();

        await CommentUpdate.parseAsync(newComment);

        return prisma.comment.updateCommentById(id, newComment);
    }

    static async create(newComment: CommentUpdateType, userId: number) {
        await CommentUpdate.parseAsync(newComment);
        const post = await PostController.get(newComment.postId);

        return await prisma.comment.createComment(newComment, userId, post.id);
    }

    static async delete(id: number, userId: number) {
        const comment = await this.get(id);
        if (comment.userId !== userId) throw new InvalidPermissionError();

        await prisma.comment.deleteCommentById(id);

        return comment;
    }
}
