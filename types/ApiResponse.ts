import { ZodIssue } from "zod";

interface BaseResponse {
  status: "success" | "error"
  code: number
}

export type DataType = {
  [key: string]: any
}

export interface SuccessResponse extends BaseResponse {
  status: "success";
  code: 200 | 201
  data: DataType | string
}

export interface ErrorResponse extends BaseResponse {
  status: "error"
  code: 400 | 401 | 403 | 404 | 405 | 422 | 429 | 500 | 501
  type: string
  message: string
  data?: ZodIssue[]
}

type ApiResponse = SuccessResponse | ErrorResponse

export default ApiResponse
