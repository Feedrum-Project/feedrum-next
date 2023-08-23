import { PrismaClient, VoteType, VoteScore, Vote } from "@prisma/client";

type VoteModel = "user" | "post" | "comment";

export default function createVoteSystem(
  client: PrismaClient,
  model: VoteModel,
  select?: Record<string, boolean>
) {
  const type = model.toUpperCase() as VoteType;

  async function voteObject(
    id: number,
    userId: number,
    score: VoteScore
  ): Promise<any | null> {
    function getObjectById(id: number) {
      return client[model as "post"].findUnique({
        where: {
          id
        },
        select
      });
    }

    async function getObjectVote(): Promise<Vote | null> {
      return client.vote.findFirst({
        where: {
          fieldId: id,
          type,
          User: {
            id: userId
          }
        }
      });
    }

    function createObjectVote(): Promise<Vote> {
      return client.vote.create({
        data: {
          fieldId: id,
          type,
          score,
          userId
        }
      });
    }

    function updateObjectRank(): Promise<any> {
      return client[model as "post"].update({
        where: {
          id
        },
        data: {
          rank: {
            increment: score === "UPVOTE" ? 1 : -1
          }
        },
        select
      });
    }

    function updateObjectVote(): Promise<Vote> {
      return client.vote.update({
        where: {
          fieldId_userId_type: {
            fieldId: id,
            userId,
            type
          }
        },
        data: {
          score
        }
      });
    }

    function revertObjectRank(): Promise<any> {
      return client[model as "post"].update({
        where: {
          id
        },
        data: {
          rank: {
            increment: score === "UPVOTE" ? 2 : -2
          }
        },
        select
      });
    }

    const vote = await getObjectVote();

    if (vote === null) {
      await createObjectVote();

      return updateObjectRank();
    }

    if (vote.score === score) return getObjectById(id);

    await updateObjectVote();

    return revertObjectRank();
  }

  async function deleteVote(id: number, userId: number) {
    const vote = await client.vote.delete({
      where: {
        fieldId_userId_type: {
          fieldId: id,
          userId,
          type
        }
      }
    });

    const object = await client[model as "post"].update({
      where: {
        id
      },
      data: {
        rank: {
          increment: vote.score === "UPVOTE" ? -1 : 1
        }
      },
      select
    });

    return object;
  }

  async function isUserVoted(id: number, userId: number) {
    const object = await client.vote.findUnique({
      where: {
        fieldId_userId_type: {
          fieldId: id,
          userId,
          type
        }
      }
    });

    return object !== null;
  }

  return {
    voteObject,
    deleteVote,
    isUserVoted
  };
}
