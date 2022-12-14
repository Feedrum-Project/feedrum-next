import ApiError from "./ApiError";

export default class FieldRegisteredError extends ApiError {
    constructor(field: string) {
        super(`This ${field} is already in use`)
    }
}