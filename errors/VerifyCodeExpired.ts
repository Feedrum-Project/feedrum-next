import ApiError from "./ApiError";

export default class VerifyCodeExpired extends ApiError {
    constructor() {
        super("Your verification code has expired")
    }
}