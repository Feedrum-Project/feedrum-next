import { ZodError, ZodIssue } from "zod";
import ApiError from "../types/ApiError";

export default class InvalidBodyError extends ApiError {
  public issues: ZodIssue[];

  constructor(error: ZodError) {
    super("Invalid body fields");

    this.issues = error.issues;
  }
}
