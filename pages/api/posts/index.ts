import type { NextApiHandler } from "next";
import PostController from "controllers/post.controller";
import authMiddleware from "middlewares/auth.middleware";
import { use } from "next-api-middleware";
import errorMiddleware from "middlewares/error.middleware";
import missingBodyMiddleware from "middlewares/missingBody.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import success from "helpers/success.helper";

/**
 * @swagger
 * /api/posts:
 *  post:
 *    description: create a post
 *    tags:
 *      - Post
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
 *                type: object
 *                properties:
 *                  body:
 *                    type: string
 *                  title:
 *                    type: string
 *                  tags:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 */
const handler: NextApiHandler = async (req, res) => {
  req.body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  switch (req.method) {
    case "GET":
      await getPosts(req, res);
      break;
    case "POST":
      await use(authMiddleware, missingBodyMiddleware)(createPost)(req, res);
      break;
    case "DELETE":
      await use(authMiddleware, missingBodyMiddleware)(deletePost)(req, res);
      break;
    case "PUT":
      await use(authMiddleware, missingBodyMiddleware)(updatePost)(req, res);
  }
};

const getPosts: NextApiHandler = async (req, res) => {
  const posts = await PostController.getAll(
    Number(req.query.page),
    Number(req.query.offset)
  );

  return success(res, posts);
};

const createPost: NextApiHandler = async (req, res) => {
  const post = await PostController.create(
    req.body.body,
    req.user.id,
    req.body.tags
  );

  return success(res, post);
};

const deletePost: NextApiHandler = async (req, res) => {
  if (!req.body.postId) return;
  const post = await PostController.delete(
    req.body.postId as number,
    req.user.id
  );

  return success(res, post);
};

const updatePost: NextApiHandler = async (req, res) => {
  const post = await PostController.update(
    req.body.id,
    req.body.post,
    req.user.id
  );

  return success(res, post);
};

export default use(
  errorMiddleware,
  validMethodsMiddleware(["GET", "POST", "DELETE", "PUT"])
)(handler);
