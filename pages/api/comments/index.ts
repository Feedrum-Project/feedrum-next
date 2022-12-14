import type { NextApiHandler } from "next";
import authMiddleware from "middlewares/auth.middleware";
import { use } from "next-api-middleware";
import errorMiddleware from "middlewares/error.middleware";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import success from "helpers/success.helper";
import CommentController from "controllers/comments.controller";

const handler: NextApiHandler = async (req, res) => {
    const comment = await CommentController.create(req.body, req.user.id)

    success(res, comment)
};


export default use(
    errorMiddleware,
    missingBodyMiddleware,
    authMiddleware,
    validMethodsMiddleware("POST"))(handler);
