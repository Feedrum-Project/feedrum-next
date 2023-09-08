import { Tag, Post, Prisma, PrismaClient } from "@prisma/client";
import { PostType, PostUpdateType } from "validation/post.model";
import createVoteSystem from "./voteSystem";
import { IComment, IPost } from "types/Post";

export default Prisma.defineExtension((client) => {
  const {
    voteObject: votePost,
    deleteVote,
    isUserVoted
  } = createVoteSystem(client as PrismaClient, "post");

  return client.$extends({
    name: "Post",
    model: {
      post: {
        async getAll(page: number, offset: number): Promise<IPost[]> {
          return client.post.findMany({
            skip: page * offset,
            take: offset,
            select: {
              id: true,
              body: true,
              title: true,
              rank: true,
              createdAt: true,
              User: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  rank: true,
                  createdAt: true,
                  isVerified: true,
                  role: true
                }
              },
              Tags: {
                select: {
                  postId: true,
                  tagId: true
                }
              },
              _count: {
                select: {
                  Comments: true
                }
              }
            }
          });
        },
        async createPost(
          post: PostType,
          userId: number,
          tags: { name: string }[]
        ): Promise<Post> {
          const createdTags: Tag[] = [];

          for (const tag of tags) {
            const existTag = await client.tag.findFirst({
              where: {
                name: tag.name
              }
            });

            if (existTag) {
              createdTags.push(existTag);
            } else {
              const createdTag = await client.tag.create({
                data: {
                  name: tag.name
                }
              });

              createdTags.push(createdTag as Tag);
            }
          }

          const createdPost = await client.post.create({
            data: {
              ...post,
              userId
            }
          });

          for await (const createdTag of createdTags) {
            await client.postTag.create({
              data: {
                post: {
                  connect: {
                    id: createdPost.id
                  }
                },
                tag: {
                  connect: {
                    id: createdTag.id
                  }
                }
              }
            });
          }

          return createdPost;
        },
        async getPostById(id: number): Promise<Post | null> {
          return client.post.findUnique({
            where: {
              id
            },
            select: {
              id: true,
              body: true,
              title: true,
              rank: true,
              createdAt: true,
              userId: true,
              Tags: {
                select: {
                  tag: true
                }
              }
            }
          });
        },
        async updatePostById(id: number, post: PostUpdateType): Promise<Post> {
          return client.post.update({
            data: post,
            where: {
              id
            }
          });
        },
        async deletePostById(id: number): Promise<Post> {
          return client.post.delete({
            where: {
              id
            }
          });
        },
        async getPostComments(id: number): Promise<IComment[]> {
          return client.comment.findMany({
            where: {
              Post: {
                id
              }
            },
            select: {
              id: true,
              body: true,
              rank: true,
              createdAt: true,
              Post: true, //
              User: true // these field needs.
            }
          });
        },
        votePost,
        deleteVote,
        isUserVoted
      }
    }
  });
});
