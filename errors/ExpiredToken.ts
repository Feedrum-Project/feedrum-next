import ApiError from "../types/ApiError";

export default class ExpiredTokenError extends ApiError {
    constructor(type: string) {
        super(`${type} token has expired, please login again`)
    }
}