import { CustomErrorParams } from "zod";

type validator = (args: { [key: string]: any }) => boolean;
type refineFun = (keys: string[]) => [validator: validator, params: CustomErrorParams]

const refine: refineFun = (keys) => {
    const check: validator = (args) =>
        keys.some(key => args[key] !== undefined)

    const params: CustomErrorParams = {
        message: `One of fields ${keys.join(", ")} must be defined`
    }

    return [check, params]
}

export default refine;