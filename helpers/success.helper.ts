import { NextApiResponse } from "next";
import ApiResponse from "types/ApiResponse";

export default function success(
    res: NextApiResponse<ApiResponse>,
    data: string | object
) {
    const code = 200;

    return res.status(code).json({
        status: "success",
        code,
        data,
    });
}
