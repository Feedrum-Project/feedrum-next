
interface BaseResponse {
  status: "success" | "error"
  code: number

}

interface SuccessResponse extends BaseResponse {
  status: "success";
  data: {
    [key: string]: any
  }
}

interface ErrorResponse extends BaseResponse {
  status: "error"
  type: string
  message: string
  data: any
}

type ApiResponse = SuccessResponse | ErrorResponse

export default ApiResponse
