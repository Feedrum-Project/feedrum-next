import { ZodError, ZodIssue } from "zod";
import ApiError from "./ApiError";

export default class InvalidIdTypeError extends ApiError {
    public issues: ZodIssue[]

    constructor(error: ZodError) {
        super("Invalid id type")
        this.issues = error.issues
    }
}