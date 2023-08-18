import InvalidPermissionError from "errors/InvalidPermission";
import InvalidQueryParamError from "errors/InvalidQueryParam";
import MissingVoteError from "errors/MissingVote";
import YourVoteError from "errors/YourVote";
import ObjectNotFoundError from "errors/ObjectNotFound";

import prisma from "@database";
import { VoteScore } from "@prisma/client";
import * as validation from "validation/general/page";
import scores from "validation/general/voteScore";
import { PostType, PostUpdate, PostUpdateType } from "validation/post.model";

export default class PostController {
    static async getAll(pageQuery: number, offsetQuery: number) {
        const page = await validation.page.spa(pageQuery);
        if (!page.success) throw new InvalidQueryParamError("page");

        const offset = await validation.offset.spa(offsetQuery);
        if (!offset.success) throw new InvalidQueryParamError("offset");

        return await prisma.post.getAll(page.data, offset.data);
    }

    static async get(id: number) {
        const post = await prisma.post.getPostById(id);
        if (post === null) throw new ObjectNotFoundError("Post");

        return post;
    }

    static async getBest() {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "asc" },
            take: 2,
            select: {
                id: true,
                title: true,
                rank: true,
                _count: {
                    select: {
                        Comments: true,
                    },
                },
            },
        });
        if (posts === null) throw new ObjectNotFoundError("Post");

        return posts;
    }

    static async delete(id: number, userId: number) {
        const post = await this.get(id);
        if (post.userId !== userId) throw new InvalidPermissionError();

        await prisma.post.deletePostById(id);

        return post;
    }

    static async create(newPost: PostType, userId: number) {
        await PostUpdate.parseAsync(newPost);

        return prisma.post.createPost(newPost, userId);
    }

    static async update(id: number, newPost: PostUpdateType, userId: number) {
        const post = await this.get(id);
        if (post.userId !== userId) throw new InvalidPermissionError();

        await PostUpdate.parseAsync(newPost);

        return prisma.post.updatePostById(id, newPost);
    }

    static async getPostComments(id: number) {
        await this.get(id);

        return prisma.post.getPostComments(id);
    }

    static async vote(id: number, userId: number, score: VoteScore) {
        await scores.parseAsync(score);
        const post = await this.get(id);

        if (post.userId === userId) throw new YourVoteError();

        return prisma.post.votePost(id, userId, score);
    }

    static async unvote(id: number, userId: number) {
        await this.get(id);

        const isUserVoted = await prisma.post.isUserVoted(id, userId);
        if (!isUserVoted) throw new MissingVoteError();

        return prisma.post.deleteVote(id, userId);
    }
}
