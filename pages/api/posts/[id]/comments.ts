import CommentController from "controllers/comments.controller";
import PostController from "controllers/post.controller";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
    case "GET":
        await getComments(req, res);
        break;
    case "POST":
        await use(missingBodyMiddleware, authMiddleware)(createComment)(req, res);
        break;
            
    }

};

const getComments: NextApiHandler = async (req, res) => {
    const comments = await PostController.getPostComments(req.id);

    return success(res, comments);
};

const createComment: NextApiHandler = async (req, res) => {
    const commentData = {
        ...req.body,
        postId: req.id
    };
    const comment = await CommentController.create(commentData, req.user.id);

    return success(res, comment);
};

export default use(
    errorMiddleware,
    validMethodsMiddleware(["GET", "POST"]),
    invalidIdMiddleware
)(handler);
