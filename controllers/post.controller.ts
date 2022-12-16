import { VoteScore } from "@prisma/client";
import InvalidBodyError from "errors/InvalidBody";
import InvalidPermissionError from "errors/InvalidPermission";
import InvalidQueryParamError from "errors/InvalidQueryParam";
import NotImplementedError from "errors/NotImplemented";
import ObjectNotFoundError from "errors/ObjectNotFound";

import xprisma from "helpers/database";
import JwtUser from "types/JwtUser";
import * as validation from "validation/general/page";
import scores from "validation/general/voteScore";
import Post, { PostType, PostUpdate, PostUpdateType } from "validation/post.model";


export default class PostController {
    static async getAll(pageQuery: number, offsetQuery: number) {
        const page = await validation.page.spa(pageQuery);
        if (!page.success) throw new InvalidQueryParamError("page");

        const offset = await validation.offset.spa(offsetQuery);
        if (!offset.success) throw new InvalidQueryParamError("offset");

        return await xprisma.post.getAll(page.data, offset.data);
    }

    static async get(id: number) {
        const post = await xprisma.post.getPostById(id);
        if (post === null) throw new ObjectNotFoundError("Post");

        return post;
    }

    static async delete(id: number, userId: number) {
        const post = await this.get(id);
        if (post.userId !== userId) throw new InvalidPermissionError();

        await xprisma.post.deletePostById(id);

        return post;
    }

    static async create(newPost: PostType, userId: number) {
        const validation = await PostUpdate.spa(newPost);
        if (!validation.success) throw new InvalidBodyError(validation.error);

        return xprisma.post.createPost(newPost, userId);
    }

    static async update(id: number, newPost: PostUpdateType, userId: number) {
        const post = await this.get(id);
        if (post.userId !== userId) throw new InvalidPermissionError();

        const postValid = await PostUpdate.spa(newPost);
        if (!postValid.success) throw new InvalidBodyError(postValid.error);

        return xprisma.post.updatePostById(id, newPost);
    }

    static async getPostComments(id: number) {
        await this.get(id)

        return xprisma.post.getPostComments(id)
    }

    static async vote(id: number, userId: number, score: VoteScore) {
        const scoreValid = await scores.spa(score);
        if (!scoreValid.success) throw new InvalidBodyError(scoreValid.error);

        await this.get(id)

        return xprisma.post.votePost(id, userId, score)
    }
}
