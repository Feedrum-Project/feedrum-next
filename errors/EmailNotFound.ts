import ApiError from "../types/ApiError";

export default class EmailNotFoundError extends ApiError {
    constructor() {
        super("Email wasn't found");
    }
}
