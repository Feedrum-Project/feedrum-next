import ApiError from "../types/ApiError";

export default class ExpiredTokenError extends ApiError {
    constructor() {
        super("Token token has expired, please login again")
    }
}