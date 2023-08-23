import ApiError from "types/ApiError";
import ExpiredTokenError from "errors/ExpiredToken";
import InvalidBodyError from "errors/InvalidBody";
import InvalidTokenError from "errors/InvalidToken";
import UnknownError from "errors/Unknown";

import { Middleware } from "next-api-middleware";
import ApiResponse from "types/ApiResponse";

interface ErrorMap {
  [key: string]: new (...args: any[]) => ApiError;
}

const errorMiddleware: Middleware = async (req, res, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
    if (!(e instanceof Error)) return console.log("B");

    const errorMap: ErrorMap = {
      TokenExpiredError: ExpiredTokenError,
      JsonWebTokenError: InvalidTokenError,
      ZodError: InvalidBodyError
    };

    const error =
      e instanceof ApiError
        ? e
        : e.constructor.name in errorMap
        ? new errorMap[e.constructor.name](e)
        : new UnknownError(e);

    const body: ApiResponse = {
      status: "error",
      message: error.message,
      code: error.code,
      type: error.constructor.name,
      data: error.issues
    };

    res.status(body.code).json(body);
  }
};

export default errorMiddleware;
