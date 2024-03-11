import { Injectable } from '@angular/core';
import { JwtCustomClaims } from "./jwt-service.types"
import { jwtDecode, JwtPayload } from "jwt-decode";
import { User } from '../types/user';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getUserFromJWT(jwt: string): User {

    const customClaims = jwtDecode<JwtCustomClaims>(jwt);

    return {
      email: customClaims.Email,
      firstname: customClaims.Firstname,
      lastname: customClaims.Lastname,
      phone_number: customClaims.PhoneNumber,
      id: customClaims.UserID,
      password: "<REDACTED>",
      accountVerified: customClaims.PhoneVerified,
      accountStatusId: customClaims.AccountStatusID,
      accountStatus: customClaims.AccountStatus,
    };
  }

  isExpired(jwt: string): boolean {
    const decoded = jwtDecode<JwtCustomClaims>(jwt);
    return new Date(decoded.exp * 1000) < new Date();
  }

  getPayload(jwt: string): JwtPayload {
    const decoded = jwtDecode<JwtCustomClaims>(jwt);
    return decoded;
  }

}
