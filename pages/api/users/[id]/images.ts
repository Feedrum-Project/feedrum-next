import UserController from "controllers/user.controller";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

/**
 * @swagger
 * /api/users/{id}/images:
 *  get:
 *    description: Get an users images.
 *    parameters:
 *      in: path
 *      name: id
 *      schema:
 *        type: integer
 *    tags:
 *      - User
 */
const handler: NextApiHandler = async (req, res) => {
  const images = await UserController.getImages(req.id, req.user.id);

  success(res, images);
};

export default use(
  errorMiddleware,
  authMiddleware,
  invalidIdMiddleware,
  validMethodsMiddleware("GET")
)(handler);
