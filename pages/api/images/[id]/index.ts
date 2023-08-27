import type { NextApiHandler } from "next";
import { use } from "next-api-middleware";
import errorMiddleware from "middlewares/error.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import { sendImage } from "helpers/image.helper";
import WTFError from "errors/WTF";
import ImageController from "controllers/images.controller";
import authMiddleware from "middlewares/auth.middleware";
import uuid from "validation/general/uuid";
import InvalidIdTypeError from "errors/InvalidIdType";
import success from "helpers/success.helper";

export const config = {
  api: {
    bodyParser: false
  }
};

/**
 * @swagger
 * /api/images/{id}:
 *  delete:
 *    description: Delete an image.
 *    parameters:
 *      - in: path
 *        name: imageId
 *        schema:
 *          type: integer
 *        required: true
 *    tags:
 *      - Image
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: UUID, actually.
 *    responses:
 *      204:
 *        description: An image succsefully deleted, no neccessary in data.
 *      400:
 *        description: Missing request body.
 *      403:
 *        description: Seems like something wrong with token. Or maybe you're not author of this image.
 *  get:
 *    description: Get an image by id.
 *    tags:
 *      - Image
 *    parameters:
 *      - in: path
 *        name: imageId
 *        schema:
 *          type: string
 *        required: true
 */
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
  validMethodsMiddleware(["DELETE", "GET"])
)(handler);
