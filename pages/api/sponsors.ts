import { NextApiHandler } from "next";

const handler: NextApiHandler = async (_, res) => {
    res.json({result: null
        // [{
        //     id: 1,
        //     name: "123",
        //     email: "123@123.123",
        //     rank: 5,
        //     createdAt: new Date(),
        //     isVerified: true,
        //     moneys: 254
        // }]

        // Example
    });
};

export default handler;