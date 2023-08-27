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
 * /api/users/{id}/vote:
 *  post:
 *    description: Vote for this user.
 *    tags:
 *      - User
 *    parameters:
 *      - in: path
 *        name: id
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
 *              score:
 *                type: string
 *                enum: [UPVOTE, DOWNVOTE]
 *    responses:
 *      201:
 *        description: Created.
 *      403:
 *        description: Invalid auth token.
 *  delete:
 *    description: Unvote.
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *    tags:
 *      - User
 *          
 */
const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      await voteUser(req, res);
      break;
    case "DELETE":
      await unvoteUser(req, res);
      break;
  }
};

const voteUser: NextApiHandler = async (req, res) => {
  typeof req.body === "string" ? (req.body = JSON.parse(req.body)) : null;

  const comment = await UserController.vote(
    req.id,
    req.user.id,
    req.body.score
  );

  success(res, comment);
};

const unvoteUser: NextApiHandler = async (req, res) => {
  const comment = await UserController.unvote(req.id, req.user.id);
  if (!comment) throw new Error("Didnt found comment");

  success(res, comment);
};

export default use(
  errorMiddleware,
  invalidIdMiddleware,
  validMethodsMiddleware(["POST", "DELETE"]),
  authMiddleware
)(handler);
