import { IDomainData, IAvailableRecipient } from '../models/recipients.model';

export const getAvailableRecipient = (users: IDomainData[]): IAvailableRecipient[] => {
  let counter = 1;
  const groupedUsers = users.reduce((acc, user) => {
    const domain = user.email.split('@')[1];
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push({
      ...user,
      id: counter++,
    });
    return acc;
  }, {});

  return Object.keys(groupedUsers).map(domain => ({
    id: counter++,
    domain,
    data: groupedUsers[domain]
  }));
};
