import { ZodIssue } from "zod";
import { ErrorResponse } from "./ApiResponse";

export default abstract class ApiError extends Error {
    code: ErrorResponse["code"] = 400;
    issues?: ZodIssue[];
}
