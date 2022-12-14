import { UserType } from "validation/user.model";

export default interface JwtUser extends UserType {
    id: number
}
