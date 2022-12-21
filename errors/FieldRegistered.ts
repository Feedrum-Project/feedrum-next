import ApiError from "../types/ApiError";

export default class FieldRegisteredError extends ApiError {
    constructor(field: string) {
        super(`This ${field} is already in use`)
    }
}