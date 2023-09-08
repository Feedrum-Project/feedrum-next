import { role } from "./Post";

export interface IUser {
  id: number;
  name: string;
  email: string;
  rank: number;
  createdAt: string | Date;
  isVerified: boolean;
  role?: role;
}

export interface IUserExtended extends IUser {
  description: string | null;
  subscribers: number;
}
