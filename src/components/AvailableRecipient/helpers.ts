import { IGroupedOption } from "../../models/autocomplete.model";
import {
  IAvailableRecipient,
  IDomainData,
} from "../../models/recipients.model";

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
