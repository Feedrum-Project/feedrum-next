export default interface ApiResponse {
  status: "error" | "success";
  code: number;
  message?: string;
  type?: string;
  data?: string | object;
}
