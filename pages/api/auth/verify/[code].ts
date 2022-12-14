import type { NextApiHandler } from "next";
import AuthController from "controllers/auth.controller";
import { use } from "next-api-middleware";

import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";
import InvalidQueryParamError from "errors/InvalidQueryParam";
import success from "helpers/success.helper";

const handler: NextApiHandler = async (req, res) => {
    const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code
    if (code === undefined) throw new InvalidQueryParamError("code")

    success(res, await AuthController.verifyEmail(code))
};

export default use(
    errorMiddleware,
    validMethodsMiddleware("GET")
)(handler);
