import InvalidPermissionError from "errors/InvalidPermission";
import NotImplementedError from "errors/NotImplemented";
import ObjectNotFoundError from "errors/ObjectNotFound";
import MissingVoteError from "errors/MissingVote";
import YourVoteError from "errors/YourVote";

import prisma from "@database";
import { VoteScore } from "@prisma/client";
import scores from "validation/general/voteScore";

export default class UserController {
    static async get(id: number) {
        const user = await prisma.user.getUserById(id);
        if (user === null) throw new ObjectNotFoundError("User");

        return user;
    }

    static async getComments(id: number) {
        await this.get(id)

        return prisma.user.getUserComments(id)
    }

    static async getPosts(id: number) {
        await this.get(id)

        return prisma.user.getUserPosts(id)
    }

    static async getImages(id: number, userId: number) {
        if (id !== userId) throw new InvalidPermissionError()

        return prisma.user.getUserImages(id)
    }

    static async vote(id: number, userId: number, score: VoteScore) {
        await scores.parseAsync(score);
        const user = await this.get(id);

        if (user.id === userId) throw new YourVoteError()

        return prisma.user.voteUser(id, userId, score)
    }

    static async unvote(id: number, userId: number) {
        await this.get(id)

        const isUserVoted = await prisma.user.isUserVoted(id, userId)
        if (!isUserVoted) throw new MissingVoteError()

        return prisma.user.deleteVote(id, userId)
    }
}
