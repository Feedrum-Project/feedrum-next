import ApiError from "./ApiError";

export default class EmailNotFoundError extends ApiError {
    constructor() {
        super("Email wasn't found")
    }
}