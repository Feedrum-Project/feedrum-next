import type { NextApiHandler } from "next";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import { use } from "next-api-middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";
import AuthController from "controllers/auth.controller";
import success from "helpers/success.helper";

/**
 * @swagger
 * /api/auth/refresh:
 *    post:
 *      security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *      description: Update your token.
 *      tags:
 *        - Authentication
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *              required:
 *                - token
 *      responses:
 *        200:
 *          description: You get a new token.
 *        403:
 *          description: You have to log in. Because your token very old.
 */
const handler: NextApiHandler = async (req, res) => {
  const token = AuthController.refresh(req.body.refreshToken);
  AuthController.setCookieToken(res, token);

  return success(res, { token });
};

export default use(
  errorMiddleware,
  validMethodsMiddleware("POST"),
  missingBodyMiddleware
)(handler);
