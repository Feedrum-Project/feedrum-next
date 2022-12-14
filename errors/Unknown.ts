import ApiError from "./ApiError";

export default class UnknownError extends ApiError {
    public code = 500;

    constructor(error: Error) {
        super("Unknown error. Please message the administration")
        
        console.error(error)
    }
}