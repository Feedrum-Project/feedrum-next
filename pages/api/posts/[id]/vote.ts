import PostController from "controllers/post.controller";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

/**
 * @swagger
 * /api/posts/{id}/vote:
 *  post:
 *    tags:
 *      - Post
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    description: Vote for a post.
 *    parameters:
 *      - in: path
 *        name: postId
 *        schema:
 *          type: integer
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              score:
 *                type: string
 *                enum: [UPVOTE, DOWNVOTE]
 *    responses:
 *      201:
 *        description: Voted.
 *      403:
 *        description: You're not author/invalid token.
 *  delete:
 *    tags:
 *      - Post
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    description: Unvote for a post.
 *    parameters:
 *      - in: path
 *        name: postId
 *        schema:
 *          type: integer
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                integer:
 *    responses:
 *      204:
 *        description: Unvoted.
 *      403:
 *        description: You're not author/invalid token.
 */
const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      await votePost(req, res);
      break;
    case "DELETE":
      await unvotePost(req, res);
      break;
  }
};

const votePost: NextApiHandler = async (req, res) => {
  typeof req.body === "string" ? (req.body = JSON.parse(req.body)) : null;

  const post = await PostController.vote(req.id, req.user.id, req.body.score);

  success(res, post);
};

const unvotePost: NextApiHandler = async (req, res) => {
  const post = await PostController.unvote(req.id, req.user.id);
  if (!post) throw new Error("Didnt found post");

  success(res, post);
};

export default use(
  errorMiddleware,
  invalidIdMiddleware,
  validMethodsMiddleware(["POST", "DELETE"]),
  authMiddleware
)(handler);
