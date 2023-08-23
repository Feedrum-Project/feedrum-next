import type { NextApiHandler } from "next";
import { use } from "next-api-middleware";
import errorMiddleware from "middlewares/error.middleware";
import validMethodsMiddleware from "middlewares/validMethods.middleware";
import { parseImages } from "helpers/image.helper";
import ImageController from "controllers/images.controller";
import authMiddleware from "middlewares/auth.middleware";
import success from "helpers/success.helper";

export const config = {
  api: {
    bodyParser: false
  }
};

const handler: NextApiHandler = async (req, res) => {
  const images = await parseImages(req);

  success(res, await ImageController.createImages(images, req.user.id));
};

export default use(
  errorMiddleware,
  authMiddleware,
  validMethodsMiddleware("POST")
)(handler);
