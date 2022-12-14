import { Prisma, PrismaClient } from "@prisma/client";
import JwtUser from "types/JwtUser";
import { CommentType, CommentUpdateType } from "validation/comment.model";

export default Prisma.defineExtension((client: PrismaClient) => {
    return client.$extends({
        name: "Comment",
        model: {
            comment: {
                async getCommentById(id: number) {
                    return client.comment.findUnique({
                        where: { id }
                    })
                },
                async updateCommentById(id: number, comment: CommentUpdateType) {
                    return client.comment.update({
                        where: { id },
                        data: comment
                    })
                },
                async deleteCommentById(id: number) {
                    return client.comment.delete({
                        where: { id }
                    })
                },
                async createComment(comment: CommentUpdateType, userId: number, postId: number) {
                    return client.comment.create({
                        data: {
                            ...comment,
                            userId,
                            postId
                        }
                    })
                }
            }
        },
    });
});
