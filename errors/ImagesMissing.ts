import ApiError from "../types/ApiError";

export default class ImagesMissingError extends ApiError {
  constructor() {
    super("Images waren't found");
  }
}
