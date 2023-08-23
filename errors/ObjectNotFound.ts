import { ErrorResponse } from "types/ApiResponse";
import ApiError from "../types/ApiError";

export default class ObjectNotFoundError extends ApiError {
  public code: ErrorResponse["code"] = 404;

  constructor(modelName: string) {
    super(`${modelName} was not found`);
  }
}
