import CommentController from "controllers/comments.controller";
import PostController from "controllers/post.controller";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";
/**
 * @swagger
 * /api/posts/{id}/comments:
 *  get:
 *    description: Get a posts comments.
 *    tags:
 *      - Post
 *    parameters:
 *    - in: path
 *      name: postId
 *      schema:
 *        type: integer
 *  post:
 *    description: Create a comment for a post.
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
 *              body:
 *                type: string
 *    responses:
 *      201:
 *        description: A comment created.
 *      403:
 *        description: You've to spicy token in cookies.
 */
const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getComments(req, res);
      break;
    case "POST":
      await use(missingBodyMiddleware, authMiddleware)(createComment)(req, res);
      break;
  }
};

const getComments: NextApiHandler = async (req, res) => {
  const comments = await PostController.getPostComments(req.id);

  return success(res, comments);
};

const createComment: NextApiHandler = async (req, res) => {
  const commentData = {
    ...req.body,
    postId: req.id
  };
  const comment = await CommentController.create(commentData, req.user.id);

  return success(res, comment);
};

export default use(
  errorMiddleware,
  validMethodsMiddleware(["GET", "POST"]),
  invalidIdMiddleware
)(handler);
