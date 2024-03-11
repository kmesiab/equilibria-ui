import { User } from "./user";

export interface UserSignupResponse {
    user: User;
    token: string;
  }
