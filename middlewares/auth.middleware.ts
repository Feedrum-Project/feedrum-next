import { Middleware } from "next-api-middleware";
import AuthRequiredError from "errors/AuthRequired";
import { NextApiRequest } from "next";
import ApiRequest from "types/ApiRequest";
import verifyToken, { TokenType } from "helpers/verifyToken.helper";

declare module "next" {
    export interface NextApiRequest extends ApiRequest { }
}

const authMiddleware: Middleware = async (req: NextApiRequest, res, next) => {
    const token = req.cookies.token;
    if (token === undefined) throw new AuthRequiredError();

    const { iat, exp, ...user } = verifyToken(token, TokenType.access)
    req.user = user

    await next();
};

export default authMiddleware;
