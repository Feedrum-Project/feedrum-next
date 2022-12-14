import { ZodIssue } from "zod";

export default abstract class ApiError extends Error {
    code?: number;
    issues?: ZodIssue[];
}
