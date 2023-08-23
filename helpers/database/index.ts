import { PrismaClient } from "@prisma/client";

import postExtension from "./post.extension";
import userExtension from "./user.extension";
import commentExtension from "./comment.extension";
import verifyCodeExtension from "./verifyCode.extension";
import imageExtension from "./image.extension";
import tagExtension from "./tag.extension";

const client = new PrismaClient();

export default client
  .$extends(tagExtension)
  .$extends(postExtension)
  .$extends(userExtension)
  .$extends(verifyCodeExtension)
  .$extends(commentExtension)
  .$extends(imageExtension);
