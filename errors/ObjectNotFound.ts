import ApiError from "../types/ApiError";

export default class ObjectNotFoundError extends ApiError {
    public code = 404

    constructor(modelName: string) {
        super(`${modelName} was not found`)
    }
}