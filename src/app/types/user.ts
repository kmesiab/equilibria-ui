import { AccountStatus, mapStatusIdToString } from "./account-status";

export enum UserType {
  PATIENT = 1,
  THERAPIST = 2,
}


export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string | null;
    phone_number: string;
    accountVerified: boolean;
    accountStatusId: AccountStatus;
    user_type_id: UserType;
    accountStatus: string;
    nudge_enabled: boolean;
    provider_code: string;
  }

  export function mapApiDataToUser(apiData: any): User {
    return {
      id: apiData.id,
      firstname: apiData.firstname,
      lastname: apiData.lastname,
      email: apiData.email,
      phone_number: apiData.phone_number,
      accountVerified: apiData.account_verified,
      accountStatusId: apiData.status_id,
      user_type_id: apiData.user_type_id,
      accountStatus: mapStatusIdToString(apiData.status_id),
      password: apiData.password,
      nudge_enabled: apiData.nudge_enabled,
      provider_code: apiData.provider_code,
    };
  }

