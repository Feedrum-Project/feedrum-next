import ApiError from "../types/ApiError";

export default class InvalidPermissionError extends ApiError {
    constructor() {
        super("Invalid permission");
    }
}
