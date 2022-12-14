import { Prisma, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export default Prisma.defineExtension((client: PrismaClient) => {
    return client.$extends({
        name: "Verify Code",
        model: {
            verifyCode: {
                async createCode(userId: number) {
                    return client.verifyCode.create({
                        data: {
                            code: randomUUID(),
                            userId,
                        },
                    });
                },
                async getCode(code: string) {
                    return client.verifyCode.findFirst({
                        where: {
                            code,
                        },
                    });
                },
                async deleteCode(code: string) {
                    return client.verifyCode.delete({
                        where: {
                            code,
                        },
                    });
                },
            },
        },
    });
});
