import ApiError from "./ApiError";

export default class AuthRequiredError extends ApiError {
    public code = 401;

    constructor() {
        super("You need to authorize");
    }
}
