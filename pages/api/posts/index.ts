import type { NextApiHandler } from "next";
import PostController from "controllers/post.controller";
import authMiddleware from "middlewares/auth.middleware";
import { use } from "next-api-middleware";
import errorMiddleware from "middlewares/error.middleware";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import success from "helpers/success.helper";

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            await getPosts(req, res);
            break;
        case "POST":
            await use(authMiddleware, missingBodyMiddleware)(createPost)(req, res);
            break;
    }
};

const getPosts: NextApiHandler = async (req, res) => {
    const posts = await PostController.getAll(
        Number(req.query.page),
        Number(req.query.offset)
    )

    return success(res, posts)

};

const createPost: NextApiHandler = async (req, res) => {
    const post = await PostController.create(req.body, req.user.id);

    return success(res, post)
};

export default use(errorMiddleware, validMethodsMiddleware(["GET", "POST"]))(handler);
