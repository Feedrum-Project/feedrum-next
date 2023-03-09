import CommentController from "controllers/comments.controller";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
    case "POST":
        await voteComment(req, res);
        break;
    case "DELETE":
        await unvoteComment(req, res);
        break;
    }
};

const voteComment: NextApiHandler = async (req, res) => {
    const comment = await CommentController.vote(req.id, req.user.id, req.body.score);

    success(res, comment);
};

const unvoteComment: NextApiHandler = async (req, res) => {
    const comment = await CommentController.unvote(req.id, req.user.id);

    success(res, comment);
};

export default use(
    errorMiddleware,
    invalidIdMiddleware,
    validMethodsMiddleware(["POST", "DELETE"]),
    authMiddleware
)(handler);
