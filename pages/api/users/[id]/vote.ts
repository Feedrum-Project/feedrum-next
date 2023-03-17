import UserController from "controllers/user.controller";
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
        await voteUser(req, res);
        break;
    case "DELETE":
        await unvoteUser(req, res);
        break;
    }
};

const voteUser: NextApiHandler = async (req, res) => {
    typeof req.body === "string" ? req.body = JSON.parse(req.body) : null;

    const comment = await UserController.vote(req.id, req.user.id, req.body.score);

    success(res, comment);
};

const unvoteUser: NextApiHandler = async (req, res) => {
    const comment = await UserController.unvote(req.id, req.user.id);

    success(res, comment);
};

export default use(
    errorMiddleware,
    invalidIdMiddleware,
    validMethodsMiddleware(["POST", "DELETE"]),
    authMiddleware
)(handler);
