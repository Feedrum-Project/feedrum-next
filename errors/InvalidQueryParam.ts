import ApiError from "./ApiError";

export default class InvalidQueryParamError extends ApiError {
    constructor(param: string) {
        super(`Invalid query param: ${param}`);
    }
}
