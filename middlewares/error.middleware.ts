import ApiError from "errors/ApiError";
import UnknownError from "errors/Unknown";

import { Middleware } from "next-api-middleware";
import ApiResponse from "types/ApiResponse";

const errorMiddleware: Middleware = async (req, res, next) => {
    try {
        await next();
    } catch (e) {
        if (!(e instanceof Error)) return console.log("B");     
        const error = e instanceof ApiError ? e : new UnknownError(e)

        const body: ApiResponse = {
            status: "error",
            message: error.message,
            code: error.code ?? 400,
            type: error.constructor.name,
            data: error.issues
        };

        res.status(body.code).json(body);
    }
};

export default errorMiddleware;
