import { NextApiResponse } from "next";
import ApiResponse, { DataType } from "types/ApiResponse";

export default function success(
  res: NextApiResponse<ApiResponse>,
  data: DataType
) {
  const code = 200;

  return res.status(code).json({
    status: "success",
    code,
    data
  });
}
