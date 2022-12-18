import { Post, Prisma, PrismaClient, VoteScore } from "@prisma/client";
import { PostType, PostUpdateType } from "validation/post.model";

export default Prisma.defineExtension((client: PrismaClient) => {

    return client.$extends({
        name: "Post",
        model: {
            post: {
                async getAll(page: number, offset: number) {
                    return client.post.findMany({
                        skip: page * offset,
                        take: offset,
                    });
                },
                async createPost(post: PostType, userId: number) {
                    return client.post.create({
                        data: {
                            ...post,
                            userId
                        },
                    });
                },
                async getPostById(id: number) {
                    return client.post.findUnique({
                        where: {
                            id,
                        },
                    });
                },
                async updatePostById(id: number, post: PostUpdateType) {
                    return client.post.update({
                        data: post,
                        where: {
                            id
                        }
                    })
                },
                async deletePostById(id: number) {
                    return client.post.delete({
                        where: {
                            id
                        }
                    })
                },
                async getPostComments(id: number) {
                    return client.comment.findMany({
                        where: {
                            User: {
                                id
                            }
                        }
                    })
                },
                async votePost(id: number, userId: number, score: VoteScore) {
                    let vote = await client.vote.findFirst({
                        where: {
                            fieldId: id,
                            type: "POST",
                            User: {
                                id
                            }
                        }
                    })
                    let post = await client.post.findUnique({
                        where: { id }
                    }) as Post

                    if (vote === null) {
                        await client.vote.create({
                            data: {
                                fieldId: id,
                                type: "POST",
                                score,
                                userId
                            }
                        })

                        return await client.post.update({
                            where: {
                                id
                            },
                            data: {
                                rank: {
                                    increment: score === "UPVOTE" ? 1 : -1
                                }
                            }
                        })
                    }

                    if (vote.score === score) return post

                    await client.vote.update({
                        where: {
                            fieldId_userId_type: {
                                fieldId: id,
                                userId,
                                type: "POST"
                            }
                        },
                        data: {
                            score
                        }
                    })

                    return await client.post.update({
                        where: {
                            id
                        },
                        data: {
                            rank: {
                                increment: score === "UPVOTE" ? 2 : -2
                            }
                        }
                    })
                },
                async isUserVoted(id: number, userId: number) {
                    const isUserVoted = await client.vote.findUnique({
                        where: {
                            fieldId_userId_type: {
                                fieldId: id,
                                userId,
                                type: "POST"
                            }
                        }
                    })

                    return isUserVoted !== null
                },
                async deletePostVote(id: number, userId: number) {
                    const vote = await client.vote.delete({
                        where: {
                            fieldId_userId_type: {
                                fieldId: id,
                                userId,
                                type: "POST"
                            }
                        }
                    });

                    const post = await client.post.update({
                        where: {
                            id
                        },
                        data: {
                            rank: {
                                increment: vote.score === "UPVOTE" ? -1 : 1
                            }
                        }
                    })

                    return post
                }
            }
        },
    });
});
