import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import { NextApiHandler } from "next";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import { use } from "next-api-middleware";

interface IUser {
  id: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
  password: string | undefined;
}

/**
 * @swagger
 * /api/auth/me:
 *  post:
 *    security:
 *      - schem:
 *        type: apiKey
 *        in: cookie
 *        name: token
 *    description: Get information about user by token.
 *    tags:
 *      - Authentication
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *            required:
 *              - token
 *    responses:
 *      200:
 *        description: You get your datas.
 *      403:
 *        description: Seems like your token needs refresh. Just log in again.
 *      
 */
const handler: NextApiHandler = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return;
  const user = jwt.verify(token, process.env.JWT_TOKEN as Secret) as IUser;
  delete user.password;

  return res.status(200).json(user);
};

export default use(validMethodsMiddleware("POST"))(handler);
