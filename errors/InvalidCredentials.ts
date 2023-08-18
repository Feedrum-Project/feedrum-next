import ApiError from "../types/ApiError";

export default class InvalidCredentialsError extends ApiError {
    constructor() {
        super("User or password isn't correct");
    }
}
