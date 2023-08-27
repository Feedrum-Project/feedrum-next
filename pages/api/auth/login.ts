import type { NextApiHandler } from "next";
import AuthController from "controllers/auth.controller";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import { use } from "next-api-middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";
import CORSable from "middlewares/cors.middleware";

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    tags:
 *      - Authentication
 *    description: Log in account.
 *    responses:
 *      200:
 *        description: You get your token.
 *      400:
 *        description: Lot of reasons, most popular is missing or wrong body.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            oneOf:
 *              - Schema1:
 *                properties:
 *                  name:
 *                    type: string
 *                  password:
 *                    type: string
 *              - Schema2:
 *                properties:
 *                  email:
 *                    type: string
 *                  password:
*                     type: string
 */
const handler: NextApiHandler = async (req, res) => {
  typeof req.body === "string" ? (req.body = JSON.parse(req.body)) : req.body;

  const user = await AuthController.login(req.body);

  AuthController.sendUser(res, user);
};

export default use(
  errorMiddleware,
  missingBodyMiddleware,
  validMethodsMiddleware("POST"),
  CORSable(["http://localhost:3000", "https://feedrum.com"])
)(handler);
