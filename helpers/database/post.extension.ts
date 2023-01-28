import { Comment, Post, Prisma, PrismaClient } from "@prisma/client";
import { PostType, PostUpdateType } from "validation/post.model";
import createVoteSystem from "./voteSystem";


export default Prisma.defineExtension((client: PrismaClient) => {
    const { voteObject: votePost, deleteVote, isUserVoted } = createVoteSystem(client, "post")

    return client.$extends({
        name: "Post",
        model: {
            post: {
                async getAll(page: number, offset: number): Promise<Post[]> {
                    return client.post.findMany({
                        skip: page * offset,
                        take: offset,
                    });
                },
                async createPost(post: PostType, userId: number): Promise<Post> {
                    return client.post.create({
                        data: {
                            ...post,
                            userId
                        },
                    });
                },
                async getPostById(id: number): Promise<Post | null> {
                    return client.post.findUnique({
                        where: {
                            id,
                        },
                    });
                },
                async updatePostById(id: number, post: PostUpdateType): Promise<Post> {
                    return client.post.update({
                        data: post,
                        where: {
                            id
                        }
                    })
                },
                async deletePostById(id: number): Promise<Post> {
                    return client.post.delete({
                        where: {
                            id
                        }
                    })
                },
                async getPostComments(id: number): Promise<Comment[]> {
                    return client.comment.findMany({
                        where: {
                            Post: {
                                id
                            }
                        }
                    })
                },
                votePost,
                deleteVote,
                isUserVoted,
            }
        },
    });
});
