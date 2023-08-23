import { ImageFormat, Prisma, PrismaClient } from "@prisma/client";

export default Prisma.defineExtension((client) => {
  return client.$extends({
    name: "Image",
    model: {
      image: {
        async createImage(id: string, userId: number, type: ImageFormat) {
          return client.image.create({
            data: {
              id,
              type,
              userId
            }
          });
        },
        async getImageById(id: string) {
          return client.image.findUnique({
            where: {
              id
            }
          });
        },
        async deleteImageById(id: string) {
          return client.image.delete({
            where: {
              id
            }
          });
        }
      }
    }
  });
});
