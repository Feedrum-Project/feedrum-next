import { ErrorResponse } from "types/ApiResponse";
import ApiError from "../types/ApiError";

export default class UnknownError extends ApiError {
    public code: ErrorResponse["code"] = 500;

    constructor(error: Error) {
        super("Unknown error. Please message the administration")
        
        console.error(error)
    }
}