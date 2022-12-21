import WTFError from "errors/WTF";
import { JwtPayload, verify } from "jsonwebtoken";
import JwtUser from "types/JwtUser";


type TokenType = "refresh" | "access"

interface VerifiedJwtUser extends JwtUser, JwtPayload {}

export default function verifyToken(token: string, type: TokenType) {
    const user = verify(token, 
        type === "access"
        ? process.env.JWT_TOKEN ?? "Nothing" 
        : process.env.JWT_REFRESH_TOKEN ?? "Also nothing");
    if (typeof user === "string") throw new WTFError()

    return user as VerifiedJwtUser
}