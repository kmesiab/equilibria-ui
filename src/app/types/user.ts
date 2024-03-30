import { AccountStatus, mapStatusIdToString } from "./account-status";

export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string | null;
    phone_number: string;
    accountVerified: boolean;
    accountStatusId: AccountStatus;
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
      accountStatus: mapStatusIdToString(apiData.status_id),
      password: apiData.password,
      nudge_enabled: apiData.nudge_enabled,
      provider_code: apiData.provider_code,
    };
  }
