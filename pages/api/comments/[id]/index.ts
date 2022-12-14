import type { NextApiHandler } from "next";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import { use } from "next-api-middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";
import method from "types/method";
import CommentController from "controllers/comments.controller";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";

const handler: NextApiHandler = async (req, res) => {
    switch (req.method as method) {
        case "GET":
            await getComment(req, res)
            break;

        case "PUT":
            await use(missingBodyMiddleware, authMiddleware)(updateComment)(req, res)
            break;
        
        case "DELETE":
            await use(authMiddleware)(deleteComment)(req, res)
            break;
    
        default:
            break;
    }
};

const getComment: NextApiHandler = async (req, res) => {
    const comment = await CommentController.get(req.id)

    return success(res, comment)
}

const updateComment: NextApiHandler = async (req, res) => {
    const comment = await CommentController.update(req.id, req.body, req.user.id)

    return success(res, comment)
}

const deleteComment: NextApiHandler = async (req, res) => {
    const comment = await CommentController.delete(req.id, req.user.id)

    return success(res, comment)
}

export default use(
    validMethodsMiddleware(["GET", "PUT", "DELETE"]),
    invalidIdMiddleware,
    errorMiddleware
)(handler);
