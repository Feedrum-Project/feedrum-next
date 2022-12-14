import type { NextApiHandler } from "next";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import { use } from "next-api-middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";
import NotImplementedError from "errors/NotImplemented";

const handler: NextApiHandler = async (req, res) => {
    throw new NotImplementedError();
};

export default use(
    missingBodyMiddleware,
    validMethodsMiddleware(["POST", "DELETE"]),
    errorMiddleware
)(handler);
