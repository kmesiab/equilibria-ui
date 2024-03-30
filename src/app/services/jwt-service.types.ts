export interface JwtCustomClaims {
  Email: string;
  Firstname: string;
  Lastname: string;
  PhoneNumber: string;
  UserID: number;
  AccountStatusID: number;
  AccountStatus: string;
  PhoneVerified: boolean;
  ProviderCode: string;
  NudgeEnabled: boolean;
  aud: string;
  exp: number;
  iss: string;
}
