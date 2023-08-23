import ApiError from "../types/ApiError";

export default class InvalidQueryParamError extends ApiError {
  constructor(param: string) {
    super(`Invalid query param: ${param}`);
  }
}
