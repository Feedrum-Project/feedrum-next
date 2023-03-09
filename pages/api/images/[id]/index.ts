
import type { NextApiHandler } from "next";
import { use } from "next-api-middleware";
import errorMiddleware from "middlewares/error.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import { sendImage, parseImages } from "helpers/image.helper";
import WTFError from "errors/WTF";
import ImageController from "controllers/images.controller";
import authMiddleware from "middlewares/auth.middleware";
import uuid from "validation/general/uuid";
import InvalidIdTypeError from "errors/InvalidIdType";
import success from "helpers/success.helper";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler: NextApiHandler = async (req, res) => {
    if (req.query.id === undefined) throw new WTFError();

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    const idValidation = await uuid.spa(id);
    if (!idValidation.success) throw new InvalidIdTypeError(idValidation.error);

    switch (req.method) {
    case "DELETE":
        await use(authMiddleware)(deleteImage(id))(req, res);
        break;

    case "GET":
        await getImage(id)(req, res);

        break;
    default:
        break;
    }
};

const deleteImage = (id: string) => {
    const handler: NextApiHandler = async (req, res) => {
        const image = await ImageController.delete(id, req.user.id);

        success(res, image);
    };

    return handler;
};

const getImage = (id: string) => {
    const handler: NextApiHandler = async (req, res) => {
        const image = await ImageController.get(id);

        sendImage(res, id, image.type);
    };

    return handler;
};

export default use(
    errorMiddleware,
    validMethodsMiddleware(["DELETE", "GET"]))(handler);
