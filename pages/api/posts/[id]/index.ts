import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import missingBodyMiddleware from "middlewares/missingBody.middleware";

import PostController from "controllers/post.controller";
import type { NextApiHandler } from "next";
import { use } from "next-api-middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import success from "helpers/success.helper";

const handler: NextApiHandler = async (req, res) => {

    switch (req.method) {
    case "GET":
        await getPost(req, res);
        break;
    case "PUT":
        await use(missingBodyMiddleware, authMiddleware)(editPost)(
            req,
            res
        );
        break;
    case "DELETE":
        await use(authMiddleware)(deletePost)(req, res);
        break;
    }
};

const getPost: NextApiHandler = async (req, res) => {
    const post = await PostController.get(req.id);

    success(res, post);
};

const editPost: NextApiHandler = async (req, res) => {
    const post = await PostController.update(req.id, req.body, req.user.id);

    success(res, post);
};

const deletePost: NextApiHandler = async (req, res) => {
    const post = await PostController.delete(req.id, req.user.id);

    success(res, post);
};

export default use(
    errorMiddleware,
    validMethodsMiddleware(["GET", "PUT", "DELETE"]),
    invalidIdMiddleware,
)(handler);
