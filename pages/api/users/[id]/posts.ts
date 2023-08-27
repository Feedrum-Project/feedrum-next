import UserController from "controllers/user.controller";
import success from "helpers/success.helper";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

/**
 * @swagger
 * /api/users/{id}/posts:
 *  get:
 *    description: Get a users posts.
 *    tags:
 *      - User
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 */
const handler: NextApiHandler = async (req, res) => {
  const posts = await UserController.getPosts(req.id);

  success(res, posts);
};

export default use(
  errorMiddleware,
  invalidIdMiddleware,
  validMethodsMiddleware("GET")
)(handler);
