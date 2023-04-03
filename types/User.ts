export interface IUser {
  id: number;
  name: string;
  email: string;
  rank: number;
  createdAt: string | Date;
  isVerified: boolean;
}

export interface IUserExtended extends IUser {
  description: string;
  subscribers: number;
}