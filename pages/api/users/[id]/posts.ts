import UserController from "controllers/user.controller";
import success from "helpers/success.helper";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

const handler: NextApiHandler = async (req, res) => {
    const posts = await UserController.getPosts(req.id)

    success(res, posts)
};

export default use(
    errorMiddleware,
    invalidIdMiddleware,
    validMethodsMiddleware("GET"),
)(handler);
