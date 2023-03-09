import type { NextApiHandler } from "next";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import { use } from "next-api-middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";
import AuthController from "controllers/auth.controller";
import success from "helpers/success.helper";

const handler: NextApiHandler = async (req, res) => {
    const token = AuthController.refresh(req.body.refreshToken);
    AuthController.setCookieToken(res, token);

    return success(res, { token });
};

export default use(
    errorMiddleware,
    validMethodsMiddleware("POST"),
    missingBodyMiddleware,
)(handler);
