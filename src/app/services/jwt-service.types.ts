export interface JwtCustomClaims {
  Email: string;
  Firstname: string;
  Lastname: string;
  PhoneNumber: string;
  UserID: number;
  AccountStatusID: number;
  AccountStatus: string;
  PhoneVerified: boolean;
  aud: string;
  exp: number;
  iss: string;
}
