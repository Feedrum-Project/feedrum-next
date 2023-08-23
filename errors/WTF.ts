import ApiError from "../types/ApiError";

export default class WTFError extends ApiError {
  constructor() {
    super("No clue how this happened. Please message admins");
  }
}
