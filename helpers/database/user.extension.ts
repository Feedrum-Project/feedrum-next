import { Prisma, PrismaClient } from "@prisma/client";
import { UserType } from "validation/user.model";
import createVoteSystem from "./voteSystem";

export default Prisma.defineExtension((client: PrismaClient) => {
    const jwtUserSelectFields = {
        id: true,
        email: true,
        isVerified: true,
        name: true,
        password: true,
    };

    const viewUserSelectFields = {
        id: true,
        email: true,
        name: true,
        rank: true,
        createdAt: true,
        isVerified: true,
    };

    const { voteObject: voteUser, deleteVote, isUserVoted } = createVoteSystem(client, "user", viewUserSelectFields)

    return client.$extends({
        name: "User",
        model: {
            user: {
                async isFieldRegistered(data: string, fieldName: string) {
                    const fieldCount = await client.user.count({
                        where: {
                            [fieldName]: data,
                        },
                    });

                    return fieldCount > 0;
                },
                async getUserById(id: number) {
                    return client.user.findUnique({
                        where: { id },
                        select: viewUserSelectFields,
                    });
                },
                async getUserByEmail(email: string) {
                    return client.user.findFirst({
                        where: { email },
                        select: jwtUserSelectFields,
                    });
                },
                async createUser(user: UserType) {
                    return client.user.create({
                        data: user,
                        select: jwtUserSelectFields,
                    });
                },
                async getUserComments(id: number) {
                    return client.comment.findMany({
                        where: {
                            User: {
                                id,
                            },
                        },
                        select: {
                            id: true,
                            body: true,
                            rank: true,
                            createdAt: true,
                            Post: true,
                            User: true
                        }
                    });
                },
                async getUserPosts(id: number) {
                    return client.post.findMany({
                        where: {
                            User: {
                                id,
                            },
                        },
                    });
                },
                async getUserImages(id: number) {
                    return client.image.findMany({
                        where: {
                            User: {
                                id
                            }
                        }
                    })
                },
                async setVerified(id: number) {
                    return client.user.update({
                        where: { id },
                        data: {
                            isVerified: true,
                        },
                    });
                },
                voteUser,
                deleteVote,
                isUserVoted
            },
        },
    });
});
