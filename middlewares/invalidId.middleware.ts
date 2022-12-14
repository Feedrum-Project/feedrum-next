import InvalidIdTypeError from "errors/InvalidIdType";
import WTFError from "errors/WTF";
import { Middleware } from "next-api-middleware";
import { default as idType } from "validation/general/id";

const invalidIdMiddleware: Middleware = async (req, res, next) => {
    if (req.query.id === undefined) throw new WTFError();

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id

    const idValidation = await idType.spa(Number(id));
    if (!idValidation.success) throw new InvalidIdTypeError(idValidation.error);

    req.id = idValidation.data;
    
    await next();
};

export default invalidIdMiddleware;
