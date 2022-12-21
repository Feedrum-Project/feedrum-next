import InvalidMethodsError from "errors/InvalidMethod";
import { Middleware } from "next-api-middleware";
import method from "types/method";

const validMethodsMiddleware = (methods: method | method[]) => {
    const methodMiddleware: Middleware = async (req, res, next) => {
        const isMethodValid = Array.isArray(methods)
            ? methods.includes(req.method as method)
            : req.method === methods;

        if (!isMethodValid) throw new InvalidMethodsError(methods)

        await next();
    };

    return methodMiddleware;
};

export default validMethodsMiddleware;
