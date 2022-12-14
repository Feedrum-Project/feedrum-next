import ApiError from "./ApiError";

export default class InvalidCredentialsError extends ApiError {
    constructor() {
        super("User or password isn't correct")
    }
}