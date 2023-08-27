import type { NextApiHandler } from "next";
import { use } from "next-api-middleware";
import errorMiddleware from "middlewares/error.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import { parseImages } from "helpers/image.helper";
import ImageController from "controllers/images.controller";
import authMiddleware from "middlewares/auth.middleware";
import success from "helpers/success.helper";

export const config = {
  api: {
    bodyParser: false
  }
};
/**
 * @swagger
 * /api/images:
 *  post:
 *    tags:
 *      - Image
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    description: Load an images. Maximum 3 files, 2mb total.
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
 *          encoding:
 *            image:
 *              contentType: image/png, image/jpeg, image/gif
 *    responses:
 *      201:
 *        description: An image created succesfully.
 *      400:
 *        description: Missing request body.
 *      403:
 *        description: You havn't a token/permissions.
 *            
 */
const handler: NextApiHandler = async (req, res) => {
  const images = await parseImages(req);

  success(res, await ImageController.createImages(images, req.user.id));
};

export default use(
  errorMiddleware,
  authMiddleware,
  validMethodsMiddleware("POST")
)(handler);
