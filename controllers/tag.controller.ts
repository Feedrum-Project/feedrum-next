import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default class TagController {
  
  static async getBest() {
    return prisma.tag.findMany({
      take: 3,
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
    });
  }
}