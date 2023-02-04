import PostController from "controllers/post.controller";
import NotImplementedError from "errors/NotImplemented";
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
        await votePost(req, res)
        break;
    case "DELETE":
        await unvotePost(req, res)
        break;
    }
};

const votePost: NextApiHandler = async (req, res) => {
    const post = await PostController.vote(req.id, req.user.id, req.body.score)

    success(res, post)
}

const unvotePost: NextApiHandler = async (req, res) => {
    const post = await PostController.unvote(req.id, req.user.id)

    success(res, post)
}

export default use(
    errorMiddleware,
    invalidIdMiddleware,
    validMethodsMiddleware(["POST", "DELETE"]),
    authMiddleware
)(handler);
