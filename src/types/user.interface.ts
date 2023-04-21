import { Users } from "../typeorm/user.typeorm";

export interface IuserWithToken {
  user: Users;
  token: string;
}
