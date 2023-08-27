import CommentController from "controllers/comments.controller";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";
import errorMiddleware from "middlewares/error.middleware";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";

import { NextApiHandler } from "next";
import { use } from "next-api-middleware";

/**
 * @swagger
 * /api/comment/{id}/vote:
 *  post:
 *    description: Vote for a comment.
 *    tags:
 *      - Comment
 *    parameters:
 *      - in: path
 *        name: commentId
 *        schema:
 *          type: integer
 *        required: true
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
 *              body:
 *                description: Write here a score field. It give understand how you rate comment.
 *                type: object
 *                properties:
 *                  score:
 *                    type: string
 *                    enum:
 *                      - UPVOTE
 *                      - DOWNVOTE
 *    
 *  delete:
 *    description: Unvote from a comment.
 *    tags:
 *      - Comment
 *    parameters:
 *      - in: path
 *        name: comentId
 *        schema:
 *          type: integer
 *        required: true
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: Id of a comment what needing in deliting.
 *            required:
 *              - id
 *          example:
 *            id: 22
 *          
 */
const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      await voteComment(req, res);
      break;
    case "DELETE":
      await unvoteComment(req, res);
      break;
  }
};

const voteComment: NextApiHandler = async (req, res) => {
  typeof req.body === "string" ? (req.body = JSON.parse(req.body)) : null;

  const comment = await CommentController.vote(
    req.id,
    req.user.id,
    req.body.score
  );

  success(res, comment);
};

const unvoteComment: NextApiHandler = async (req, res) => {
  const comment = await CommentController.unvote(req.id, req.user.id);
  if (!comment) throw new Error("Didnt found comment");

  success(res, comment);
};

export default use(
  errorMiddleware,
  invalidIdMiddleware,
  validMethodsMiddleware(["POST", "DELETE"]),
  authMiddleware
)(handler);
