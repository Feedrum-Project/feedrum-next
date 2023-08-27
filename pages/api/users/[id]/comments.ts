import UserController from "controllers/user.controller";
import success from "helpers/success.helper";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";
/**
 * @swagger
 * /api/users/{id}/comments:
 *  get:
 *    description: Get an users comments
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *    tags:
 *      - User
 */
const handler: NextApiHandler = async (req, res) => {
  const comments = await UserController.getComments(req.id);

  success(res, comments);
};

export default use(
  errorMiddleware,
  invalidIdMiddleware,
  validMethodsMiddleware("GET")
)(handler);
