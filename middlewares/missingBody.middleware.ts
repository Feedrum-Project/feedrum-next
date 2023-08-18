import MissingBodyError from "errors/MissingBody";
import { Middleware } from "next-api-middleware";

const missingBodyMiddleware: Middleware = async (req, res, next) => {
    if (!req.body) throw new MissingBodyError();

    await next();
};

export default missingBodyMiddleware;
