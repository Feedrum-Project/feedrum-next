import ApiError from "./ApiError";

export default class NotImplementedError extends ApiError {
    constructor() {
        super("This route is still in development")
    }
}