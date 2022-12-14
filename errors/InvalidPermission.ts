import ApiError from "./ApiError";

export default class InvalidPermissionError extends ApiError {
    constructor() {
        super("Invalid permission");
    }
}
