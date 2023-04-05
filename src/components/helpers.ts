import { IDomainData, IAvailableRecipient } from "../models/recipients.model";

/**
 * Returns an array of available recipients grouped by their email domain
 * @param users An array of user objects containing email addresses
 * @returns An array of available recipient objects grouped by email domain
 */
export const getAvailableRecipient = (
  users: IDomainData[]
): IAvailableRecipient[] => {
  let counter = 1;

  // group users by email domain
  const groupedUsers = users.reduce((acc, user) => {
    const domain = user.email.split("@")[1];

    // if the email domain doesn't exist, create an array for it in the acc object
    if (!acc[domain]) {
      acc[domain] = [];
    }

    // add the user to the array for the email domain, and assign an id to the user
    acc[domain].push({
      ...user,
      id: counter++,
    });
    return acc;
  }, {});

  // convert the groupedUsers object into an array of available recipient objects
  return Object.keys(groupedUsers).map((domain) => ({
    id: counter++,
    domain,
    data: groupedUsers[domain],
  }));
};
