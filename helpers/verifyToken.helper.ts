import InvalidTokenError from "errors/InvalidToken";
import TokenExpiredError from "errors/TokenExpired";
import WTFError from "errors/WTF";
import { JsonWebTokenError, JwtPayload, TokenExpiredError as TEError, verify } from "jsonwebtoken";
import JwtUser from "types/JwtUser";

export enum TokenType {
    refresh = "REFRESH",
    access = "ACCESS"
}

interface VerifiedJwtUser extends JwtUser, JwtPayload {}

export default function verifyToken(token: string, type: TokenType) {
    try {
        const user = verify(token, 
            type === TokenType.access 
            ? process.env.JWT_TOKEN ?? "Nothing" 
            : process.env.JWT_REFRESH_TOKEN ?? "Also nothing");
        if (typeof user === "string") throw new WTFError()

        return user as VerifiedJwtUser
    } catch (error) {
        if (error instanceof TEError) throw new TokenExpiredError();
        if (error instanceof JsonWebTokenError) throw new InvalidTokenError();

        throw error
    }
}