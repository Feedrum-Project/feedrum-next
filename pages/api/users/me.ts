import UserController from "controllers/user.controller";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

const handler: NextApiHandler = async (req, res) => {
    const user = await UserController.get(req.user.id)

    success(res, user)
} 

export default use(authMiddleware, validMethodsMiddleware("GET"), errorMiddleware)(handler)