import JwtUser from "./JwtUser"

export default interface ApiRequest {
    id: number
    user: JwtUser
}