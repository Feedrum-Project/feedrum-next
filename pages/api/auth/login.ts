import type { NextApiHandler } from "next";
import AuthController from "controllers/auth.controller";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import { use } from "next-api-middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";

const handler: NextApiHandler = async (req, res) => {

    if(req.cookies.token) return res.status(400).json({message:"You're yet logged in.", code:400});
    typeof req.body === "string" ? req.body = JSON.parse(req.body) : req.body;

    const user = await AuthController.login(req.body);

    AuthController.sendUser(res, user);
};

export default use(
    errorMiddleware,
    missingBodyMiddleware,
    validMethodsMiddleware("POST")
)(handler);
