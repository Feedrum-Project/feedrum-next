import InvalidPermissionError from "errors/InvalidPermission";
import NotImplementedError from "errors/NotImplemented";
import ObjectNotFoundError from "errors/ObjectNotFound";
import prisma from "@database";

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

    static async upvote(id: number) {
        throw new NotImplementedError()
    }
}
