import ApiError from "./ApiError";

export default class MissingBodyError extends ApiError {
    constructor() {
        super("Request body not found")
    }
}