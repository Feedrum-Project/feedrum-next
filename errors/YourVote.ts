import ApiError from "types/ApiError";

export default class YourVoteError extends ApiError {
  constructor() {
    super("You can't vote your own object");
  }
}
