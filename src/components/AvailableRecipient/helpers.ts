import { IAvailableRecipient, IDomainData } from '../../models/recipients.model';

export const onRemoveEmail = (data: IAvailableRecipient[], emailId: number): IAvailableRecipient[] => {
  const recipientObj: IAvailableRecipient = data.find(recipient => recipient.data.some(item => item.id === emailId));
  const selectedItemObj: IDomainData = recipientObj.data.find(item => item.id === emailId);
  const emailIndex = recipientObj.data.indexOf(selectedItemObj);
  recipientObj.data.splice(emailIndex, 1);
  if (!recipientObj.data.length) {
    const domainIndex = data.indexOf(recipientObj);
    data.splice(domainIndex, 1);
  }
  return data;
};

export const onRemoveDomain = (data: IAvailableRecipient[], domainId: number): IAvailableRecipient[] => {
  const recipientObj: IAvailableRecipient = data.find(recipient => recipient.id === domainId);
  const domainIndex = data.indexOf(recipientObj);
  data.splice(domainIndex, 1);
  return data;
};
