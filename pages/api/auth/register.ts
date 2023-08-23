import type { NextApiHandler } from "next";
import AuthController from "controllers/auth.controller";
import { use } from "next-api-middleware";

import missingBodyMiddleware from "middlewares/missingBody.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import errorMiddleware from "middlewares/error.middleware";
import CORSable from "middlewares/cors.middleware";

const handler: NextApiHandler = async (req, res) => {
  typeof req.body === "string" ? (req.body = JSON.parse(req.body)) : req.body;

  const token = await AuthController.register(req.body);

  AuthController.sendUser(res, token);
};

export default use(
  errorMiddleware,
  missingBodyMiddleware,
  validMethodsMiddleware("POST"),
  CORSable(["http://192.168.0.29:3000", "https://feedrum.com"])
)(handler);
