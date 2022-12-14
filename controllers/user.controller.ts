import NotImplementedError from "errors/NotImplemented";
import ObjectNotFoundError from "errors/ObjectNotFound";
import xprisma from "helpers/database";

export default class UserController {
    static async get(id: number) {
        const user = await xprisma.user.getUserById(id);
        if (user === null) throw new ObjectNotFoundError("User");

        return user;
    }

    static async getComments(id: number) {
        await this.get(id)

        return xprisma.user.getUserComments(id)
    }

    static async getPosts(id: number) {
        await this.get(id)

        return xprisma.user.getUserPosts(id)
    }

    static async upvote(id: number) {
        throw new NotImplementedError()
    }
}
