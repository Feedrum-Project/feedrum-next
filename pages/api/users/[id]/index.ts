import UserController from "controllers/user.controller";
import success from "helpers/success.helper";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    description: Get user information by id.
 *    tags:
 *      - User
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *    responses:
 *      404:
 *        description: Not found.
 *      200:
 *        description: Found.
 */
const handler: NextApiHandler = async (req, res) => {
  const user = await UserController.get(req.id);

  success(res, user);
};

export default use(
  errorMiddleware,
  invalidIdMiddleware,
  validMethodsMiddleware("GET")
)(handler);
