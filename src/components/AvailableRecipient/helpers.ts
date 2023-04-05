import { IGroupedOption } from "../../models/autocomplete.model";
import {
  IAvailableRecipient,
  IDomainData,
} from "../../models/recipients.model";

/**
 * Removes an email from the array of available recipients and returns the updated array
 * @param data An array of available recipient
 * @param emailId The id of the email to be removed
 * @returns The updated array of available recipient, or null if emailId is falsy
 */
export const onRemoveEmail = (
  data: IAvailableRecipient[],
  emailId: number
): IAvailableRecipient[] | null => {
  if (!emailId) {
    return null;
  }
  const recipientObj: IAvailableRecipient = data.find((recipient) =>
    recipient.data.some((item) => item.id === emailId)
  );
  const selectedItemObj: IDomainData = recipientObj.data.find(
    (item) => item.id === emailId
  );
  const emailIndex = recipientObj.data.indexOf(selectedItemObj);
  recipientObj.data.splice(emailIndex, 1);
  if (!recipientObj.data.length) {
    const domainIndex = data.indexOf(recipientObj);
    data.splice(domainIndex, 1);
  }
  return data;
};

/**
 * Removes a domain from the array of available recipients and returns the updated array
 * @param data An array of available recipient
 * @param domainId The id of the domain to be removed
 * @returns The updated array of available recipient, or null if domainId is falsy
 */
export const onRemoveDomain = (
  data: IAvailableRecipient[],
  domainId: number
): IAvailableRecipient[] | null => {
  if (!domainId) {
    return null;
  }
  const recipientObj: IAvailableRecipient = data.find(
    (recipient) => recipient.id === domainId
  );
  const domainIndex = data.indexOf(recipientObj);
  data.splice(domainIndex, 1);
  return data;
};

/**
 * Groups an array of available recipient by domain and formats them as options for the autocomplete component
 * @param data An array of available recipient
 * @returns An array of objects containing the available recipient options, grouped by domain
 */
export const getGroupedOptions = (
  data: IAvailableRecipient[]
): IGroupedOption[] => {
  return data.map((item) => ({
    label: item.domain,
    options: item.data.map((dataItem) => ({
      value: dataItem.id.toString(),
      label: dataItem.email,
    })),
  }));
};
