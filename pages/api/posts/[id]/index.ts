import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import missingBodyMiddleware from "middlewares/missingBody.middleware";

import PostController from "controllers/post.controller";
import type { NextApiHandler } from "next";
import { use } from "next-api-middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import success from "helpers/success.helper";

/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *    description: Get a post by id.
 *    tags:
 *      - Post
 *    parameters:
 *      - in: path
 *        name: postId
 *        schema:
 *          type: integer
 *  put:
 *      description: Update a post.
 *      parameters:
 *        - in: path
 *          name: postId
 *          schema:
 *            type: integer
 *      tags:
 *        - Post
 *      security:
 *        - schem:
 *          type: apiKey
 *          in: cookie
 *          name: token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                body:
 *                  type: object
 *                  properties:
 *                    body:
 *                      type: string
 *                    title:
 *                      type: string
 *      responses:
 *        204:
 *          description: Succesfully update.
 *        403:
 *          description: Something wrong with token/you're not author.
 *  delete:
 *    description: Delete a post by id.
 *    tags:
 *      - Post
 *    parameters:
 *      - in: path
 *        name: postId
 *        schema:
 *          type: integer
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
 *                type: integer
 *    responses:
 *      204:
 *        description: You succesfully deleting post.
 *      403:
 *        description: You're not author or your token is expired.
 */
const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getPost(req, res);
      break;
    case "PUT":
      await use(missingBodyMiddleware, authMiddleware)(editPost)(req, res);
      break;
    case "DELETE":
      await use(authMiddleware)(deletePost)(req, res);
      break;
  }
};

const getPost: NextApiHandler = async (req, res) => {
  const post = await PostController.get(req.id);

  success(res, post);
};

const editPost: NextApiHandler = async (req, res) => {
  const post = await PostController.update(req.id, req.body, req.user.id);

  success(res, post);
};

const deletePost: NextApiHandler = async (req, res) => {
  const post = await PostController.delete(req.id, req.user.id);

  success(res, post);
};

export default use(
  errorMiddleware,
  validMethodsMiddleware(["GET", "PUT", "DELETE"]),
  invalidIdMiddleware
)(handler);
