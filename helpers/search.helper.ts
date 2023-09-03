import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function search(data: string) {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            search: data
          }
        },
        {
          body: {
            search: data
          }
        }
      ]
    },
    select: {
      id: true,
      body: true,
      title: true,
      rank: true,
      createdAt: true,
      User: true
    }
  });
  const users = await prisma.user.findMany({
    where: {
      name: {
        search: data
      }
    },
    select: {
      id: true,
      createdAt: true,
      name: true,
      rank: true,
      role: true,
      isVerified: true,
      description: true
    }
  });
  const comments = await prisma.comment.findMany({
    where: {
      body: {
        search: data
      }
    },
    select: {
      id: true,
      body: true,
      rank: true,
      createdAt: true,
      postId: true,
      User: {
        select: {
          id: true,
          name: true,
          rank: true
        }
      }
    }
  });
  return { posts, users, comments };
}
