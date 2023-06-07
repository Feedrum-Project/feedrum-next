import { Middleware } from "next-api-middleware";

const CORSable = (ACAO?: boolean | string[]) => {
    const methodMiddleware: Middleware = async (req, res, next) => {
        ACAO ? res.setHeader("Access-Control-Allow-Origin", ACAO === true ? "*" : ACAO.join(", ")) : null;
        await next();
    };

    return methodMiddleware;
};

export default CORSable;