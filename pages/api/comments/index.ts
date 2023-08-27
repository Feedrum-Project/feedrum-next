import type { NextApiHandler } from "next";
import authMiddleware from "middlewares/auth.middleware";
import { use } from "next-api-middleware";
import errorMiddleware from "middlewares/error.middleware";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import success from "helpers/success.helper";
import CommentController from "controllers/comments.controller";
/**
 * @swagger
 * /api/comments:
 *  post:
 *    tags:
 *      - Comment
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    description: Create a comment. User known by token.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              body:
 *                type: string
 *              postId:
 *                type: integer
 *            required:
 *              - body
 *              - postId
 *    responses:
 *      201:
 *        description: A comment created.
 *      403:
 *        description: Refresh a token or log in.
 *          
 */
const handler: NextApiHandler = async (req, res) => {
  typeof req.body === "string" ? (req.body = JSON.parse(req.body)) : req.body;

  const comment = await CommentController.create(req.body, req.user.id);

  success(res, comment);
};

export default use(
  errorMiddleware,
  missingBodyMiddleware,
  authMiddleware,
  validMethodsMiddleware("POST")
)(handler);
