import { Prisma, PrismaClient } from "@prisma/client";
import { CommentUpdateType } from "validation/comment.model";
import createVoteSystem from "./voteSystem";

export default Prisma.defineExtension((client) => {
  const {
    voteObject: voteComment,
    deleteVote,
    isUserVoted
  } = createVoteSystem(client as PrismaClient, "comment");

  return client.$extends({
    name: "Comment",
    model: {
      comment: {
        async getCommentById(id: number) {
          return client.comment.findUnique({
            where: { id }
          });
        },
        async updateCommentById(id: number, comment: CommentUpdateType) {
          return client.comment.update({
            where: { id },
            data: comment
          });
        },
        async deleteCommentById(id: number) {
          return client.comment.delete({
            where: { id }
          });
        },
        async createComment(
          comment: CommentUpdateType,
          userId: number,
          postId: number
        ) {
          return client.comment.create({
            data: {
              ...comment,
              userId,
              postId
            }
          });
        },
        voteComment,
        deleteVote,
        isUserVoted
      }
    }
  });
});
