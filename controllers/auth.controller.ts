import { verify, sign } from "jsonwebtoken";
import { NextApiResponse } from "next/types";
import bcrypt from "bcryptjs";

import xprisma from "helpers/database";
import User, { UserType } from "validation/user.model";

import FieldRegisteredError from "errors/FieldRegistered";
import InvalidBodyError from "errors/InvalidBody";
import InvalidCredentialsError from "errors/InvalidCredentials";
import EmailNotFoundError from "errors/EmailNotFound";
import success from "helpers/success.helper";
import sendEmail from "helpers/email.helper";
import ObjectNotFoundError from "errors/ObjectNotFound";
import UserController from "./user.controller";
import VerifyCodeExpired from "errors/VerifyCodeExpired";
import NotImplementedError from "errors/NotImplemented";
import WTFError from "errors/WTF";
import JwtUser from "types/JwtUser";
import verifyToken, { TokenType } from "helpers/verifyToken.helper";

interface Tokens {
    access: string;
    refresh: string;
}

interface UserResponse extends Omit<JwtUser, "password"> {
    tokens: Tokens
}

export default class AuthController {
    static sendUser(res: NextApiResponse, user: UserResponse) {
        this.setCookieToken(res, user.tokens.access)

        return success(res, user);
    }

    static setCookieToken(res: NextApiResponse, token: string) {
        res.setHeader("Set-Cookie", `token=${token};`)
    }

    static sign(user: JwtUser) {
        const tokens: Tokens = {
            access: sign(user, process.env.JWT_TOKEN ?? "Nothing", {
                expiresIn: "1d"
            }),
            refresh: sign(user, process.env.JWT_REFRESH_TOKEN ?? "Also nothing", {
                expiresIn: "2d"
            })
        }

        return tokens;
    }

    static refresh(refreshToken: string) {
        const user = verifyToken(refreshToken, TokenType.refresh)

        delete user.exp
        delete user.iat

        return this.sign(user).access
    }

    static async login(userData: Omit<UserType, "name">) {
        const validation = await User.omit({ name: true }).spa(userData);
        if (!validation.success) throw new InvalidBodyError(validation.error);

        const user = await xprisma.user.getUserByEmail(userData.email);
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
            tokens: this.sign(user),
        };
    }

    static async register(userData: UserType) {
        const validation = await User.spa(userData);
        if (!validation.success) throw new InvalidBodyError(validation.error);

        const uniqueFields: (keyof UserType)[] = ["email", "name"];
        const checkedUniqueFields = await Promise.all(uniqueFields.map(
            (field) => xprisma.user.isFieldRegistered(userData[field], field)
        ));

        checkedUniqueFields.forEach((isFieldRegistered, index) => {
            if (isFieldRegistered) throw new FieldRegisteredError(uniqueFields[index])
        });


        userData.password = await bcrypt.hash(userData.password, 10);
        const user = await xprisma.user.createUser(userData);

        const verifyCode = await xprisma.verifyCode.createCode(user.id);
        await sendEmail({
            email: user.email,
            subject: "Please verify your email",
            letterName: "verify",
            options: {
                link: `https://locahost:3000/api/auth/verify/${verifyCode.code}`
            }
        });

        return {
            ...user,
            password: undefined,
            tokens: this.sign(user),
        }
    }

    static async verifyEmail(code: string) {
        const verifyCode = await xprisma.verifyCode.getCode(code);
        if (verifyCode === null) throw new ObjectNotFoundError("VerifyCode");

        const codeExparationTime = 2 * 60 * 60 * 1000; // 2 hours
        const isCodeExpired =
            verifyCode.createdAt.valueOf() + codeExparationTime < Date.now();
        if (isCodeExpired) {
            await xprisma.verifyCode.deleteCode(code);

            throw new VerifyCodeExpired();
        }

        const user = await UserController.get(verifyCode.userId);

        await xprisma.user.setVerified(user.id);
        await xprisma.verifyCode.deleteCode(code);

        return user;
    }

    static async refreshToken() {
        throw new NotImplementedError()
    }
}
