import type { NextApiHandler } from "next";
import AuthController from "controllers/auth.controller";
import { use } from "next-api-middleware";

import missingBodyMiddleware from "middlewares/missingBody.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";

const handler: NextApiHandler = async (req, res) => {
    const token = await AuthController.register(req.body);

    AuthController.sendUser(res, token);
};

export default use(
    errorMiddleware,
    missingBodyMiddleware,
    validMethodsMiddleware("POST")
)(handler);
