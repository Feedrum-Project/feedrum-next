import ApiError from "./ApiError";

export default class TokenExpiredError extends ApiError {
    constructor() {
        super("Token has expired, please login again")
    }
}