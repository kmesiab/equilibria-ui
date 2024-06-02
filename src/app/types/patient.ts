export interface Patient {
  status: {
    id: number;
    name: string;
  };
  id: number;
  phone_number: string;
  phone_verified: boolean;
  firstname: string;
  lastname: string;
  email: string;
  nudge_enabled: boolean;
  provider_code: string;
}
