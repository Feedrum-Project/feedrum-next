import { ZodIssue } from "zod";

export default abstract class ApiError extends Error {
    code = 400;
    issues?: ZodIssue[];
}
