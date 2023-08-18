import ApiError from "../types/ApiError";

export default class VerifyCodeExpired extends ApiError {
    constructor() {
        super("Your verification code has expired");
    }
}
