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

const handler: NextApiHandler = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return;
    const user = jwt.verify(token, process.env.JWT_TOKEN as Secret) as IUser;
    delete user.password;

    return res.status(200).json(user);
};

export default use(validMethodsMiddleware("POST"))(handler);
