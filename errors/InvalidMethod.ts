import { ErrorResponse } from "types/ApiResponse";
import method from "types/method";
import ApiError from "../types/ApiError";

export default class InvalidMethodsError extends ApiError {
    public code: ErrorResponse["code"] = 405

    constructor(methods: method | method[]) {
        super(
            `Invalid request method. Only ${
                Array.isArray(methods) ? methods.join(", ") : methods
            } is allowed`
        );
    }
}
