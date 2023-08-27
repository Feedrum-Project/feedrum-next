import type { NextApiHandler } from "next";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import { use } from "next-api-middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";
import method from "types/method";
import CommentController from "controllers/comments.controller";
import invalidIdMiddleware from "middlewares/invalidId.middleware";
import success from "helpers/success.helper";
import authMiddleware from "middlewares/auth.middleware";

/**
 * @swagger
 * /api/comments/{id}:
 *  get:
 *    tags:
 *      - Comment
 *    parameters:
 *      - in: path
 *        name: commentId
 *        schema:
 *          type: integer
 *        required: true
 *  put:
 *    description: Update a comments content.
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
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              body:
 *                type: string
 *                description: New body.
 *              postId:
 *                type: integer
 *                description: Id of current post. You can ignore this field, actually.
 *            required:
 *              - body
 *          example:
 *            body: Very-very nice post, I've liked it ( I'm sorry, I did typemistake, edited )
 *            postId: 13
 *  delete:
 *    description: Delete a comment by Id.
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
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: Id of comment what you want to delete.
 *            required:
 *              - id
 *          example:
 *            id: 17
 */
const handler: NextApiHandler = async (req, res) => {
  switch (req.method as method) {
    case "GET":
      await getComment(req, res);
      break;

    case "PUT":
      await use(missingBodyMiddleware, authMiddleware)(updateComment)(req, res);
      break;

    case "DELETE":
      await use(authMiddleware)(deleteComment)(req, res);
      break;

    default:
      break;
  }
};

const getComment: NextApiHandler = async (req, res) => {
  const comment = await CommentController.get(req.id);

  return success(res, comment);
};

const updateComment: NextApiHandler = async (req, res) => {
  const comment = await CommentController.update(req.id, req.body, req.user.id);

  return success(res, comment);
};

const deleteComment: NextApiHandler = async (req, res) => {
  const comment = await CommentController.delete(req.id, req.user.id);

  return success(res, comment);
};

export default use(
  validMethodsMiddleware(["GET", "PUT", "DELETE"]),
  invalidIdMiddleware,
  errorMiddleware
)(handler);
