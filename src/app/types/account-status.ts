export enum AccountStatus {
  PENDING_ACTIVATION = 1,
  ACTIVE,
  SUSPENDED,
  EXPIRED
}

const AccountStatusNames: { [id in AccountStatus]: string } = {
  [AccountStatus.PENDING_ACTIVATION]: 'Pending Activation',
  [AccountStatus.ACTIVE]: 'Active',
  [AccountStatus.SUSPENDED]: 'Suspended',
  [AccountStatus.EXPIRED]: 'Expired'
};

export function mapStatusIdToAccountStatus(statusId: number): AccountStatus {
  return statusId in AccountStatus ? statusId : AccountStatus.PENDING_ACTIVATION;
}

export function mapStatusNameToAccountStatus(statusName: string): AccountStatus {
  const statusEntry = Object.entries(AccountStatusNames).find(([, name]) => name === statusName);
  if (statusEntry) {
    return Number(statusEntry[0]) as AccountStatus;
  }
  throw new Error('Invalid status name');
}

export function mapStatusIdToString(statusId: AccountStatus): string {
  return AccountStatusNames[statusId] || 'Unknown';
}
