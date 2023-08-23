import { sign } from "jsonwebtoken";
import { NextApiResponse } from "next/types";
import bcrypt from "bcryptjs";

import prisma from "@database";
import User, { UserType } from "validation/user.model";
import UserController from "./user.controller";
import JwtUser from "types/JwtUser";
import Tokens from "types/Tokens";

import FieldRegisteredError from "errors/FieldRegistered";
import InvalidCredentialsError from "errors/InvalidCredentials";
import VerifyCodeExpired from "errors/VerifyCodeExpired";
import ObjectNotFoundError from "errors/ObjectNotFound";
import EmailNotFoundError from "errors/EmailNotFound";

import success from "helpers/success.helper";
import sendEmail from "helpers/email.helper";
import verifyToken from "helpers/verifyToken.helper";

interface UserResponse extends Omit<JwtUser, "password"> {
  tokens: Tokens;
}

export default class AuthController {
  static sendUser(res: NextApiResponse, user: UserResponse) {
    this.setCookieToken(res, user.tokens.access);

    return success(res, user);
  }

  static setCookieToken(res: NextApiResponse, token: string) {
    res.setHeader("Set-Cookie", `token=${token}; Path=/api/`);
  }

  static sign(user: JwtUser) {
    const tokens: Tokens = {
      access: sign(user, process.env.JWT_TOKEN ?? "Nothing", {
        expiresIn: "1d"
      }),
      refresh: sign(user, process.env.JWT_REFRESH_TOKEN ?? "Also nothing", {
        expiresIn: "2d"
      })
    };

    return tokens;
  }

  static refresh(refreshToken: string) {
    const user = verifyToken(refreshToken, "refresh");

    delete user.exp;
    delete user.iat;

    return this.sign(user).access;
  }

  static async login(userData: Omit<UserType, "name">) {
    await User.omit({ name: true }).parseAsync(userData);

    const user = await prisma.user.getUserByEmail(userData.email);
    if (user === null) throw new EmailNotFoundError();

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return {
      ...user,
      password: undefined,
      tokens: this.sign(user)
    };
  }

  static async register(userData: UserType) {
    await User.parseAsync(userData);

    const uniqueFields: (keyof UserType)[] = ["email", "name"];
    const checkedUniqueFields = await Promise.all(
      uniqueFields.map((field) =>
        prisma.user.isFieldRegistered(userData[field], field)
      )
    );

    checkedUniqueFields.forEach((isFieldRegistered, index) => {
      if (isFieldRegistered)
        throw new FieldRegisteredError(uniqueFields[index]);
    });

    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.createUser(userData);

    const verifyCode = await prisma.verifyCode.createCode(user.id);
    await sendEmail({
      email: user.email,
      subject: "Please verify your email",
      letterName: "verify",
      options: {
        link: `https://localhost:3000/api/auth/verify/${verifyCode.code}`
      }
    });

    return {
      ...user,
      password: undefined,
      tokens: this.sign(user)
    };
  }

  static async verifyEmail(code: string) {
    const verifyCode = await prisma.verifyCode.getCode(code);
    if (verifyCode === null) throw new ObjectNotFoundError("VerifyCode");

    const codeExparationTime = 2 * 60 * 60 * 1000; // 2 hours
    const isCodeExpired =
      verifyCode.createdAt.valueOf() + codeExparationTime < Date.now();
    if (isCodeExpired) {
      await prisma.verifyCode.deleteCode(code);

      throw new VerifyCodeExpired();
    }

    const user = await UserController.get(verifyCode.userId);

    await prisma.user.setVerified(user.id);
    await prisma.verifyCode.deleteCode(code);

    return user;
  }
}
