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
    }
  });
  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          name: {
            search: data
          }
        }
      ]
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
      AND: [
        {
          body: {
            search: data
          }
        }
      ]
    }
  });
  return { posts, users, comments };
}
