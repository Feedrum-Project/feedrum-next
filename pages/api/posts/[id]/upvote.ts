import NotImplementedError from "errors/NotImplemented";
import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

const handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case "POST":
            throw new NotImplementedError();

            break;
        case "DELETE":
            throw new NotImplementedError();

            break;
    }
};

export default use(
    errorMiddleware,
    validMethodsMiddleware(["POST", "DELETE"]),
    authMiddleware
)(handler);
