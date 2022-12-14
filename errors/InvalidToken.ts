import ApiError from "./ApiError";

export default class InvalidTokenError extends ApiError {
    constructor() {
        super("Invalid auth token")
    }
}