import { Prisma, PrismaClient } from "@prisma/client";

// export default function tagExtension(client: PrismaClient) {
//   return {
//     name: "Tag",
//     model: {
//       tag: {
//         async createTags(names: { name: string }[]) {
//           return await client.tag.createMany({ data: names });
//         }
//       }
//     }
//   };
// }
export default Prisma.defineExtension((client) => {
  return client.$extends({
    name: "Tag",
    model: {
      tag: {
        async createTags(names: { name: string }[]) {
          return await client.tag.createMany({ data: names });
        }
      }
    }
  });
});
