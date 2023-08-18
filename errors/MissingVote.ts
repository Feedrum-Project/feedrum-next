import ApiError from "../types/ApiError";

export default class MissingVoteError extends ApiError {
    constructor() {
        super("You haven't voted");
    }
}
