import { IOption } from "../../models/autocomplete.model";
import { IAvailableRecipient, IDomainData } from "../../models/recipients.model";

export const onCreateNewOption = (label: string): IOption => ({
  label,
  value: new Date().getTime().toString(),
});

export const onCreateOption = (inputValue: string, newOption: IOption, data: IAvailableRecipient[]): IAvailableRecipient[] => {
  const domain = inputValue.split('@')[1];
  const domainIndex = data.findIndex((item) => item.domain === domain);
  if (domainIndex > -1) {
    data[domainIndex].data.push({
      id: parseInt(newOption.value),
      email: newOption.label,
      isSelected: false,
    });
  } else {
    data.push({
      id: new Date().getTime(),
      domain,
      data: [{
        id: parseInt(newOption.value),
        email: newOption.label,
        isSelected: false,
      }],
    });
  }
  return data;
};

export const onSelecteNewValue = (option: IOption, data: IAvailableRecipient[]): IAvailableRecipient[] => {
  const recipientObj: IAvailableRecipient = data.find((recipient) =>
    recipient.data.some((item) => item.id.toString() === option.value)
  );
  const selectedItemObj: IDomainData = recipientObj.data.find(
    (item) => item.id.toString() === option.value
  );
  const domainIndex = data.indexOf(recipientObj);
  const emailIndex = recipientObj.data.indexOf(selectedItemObj);
  const selectedEmail = data[domainIndex].data[emailIndex];
  selectedEmail.isSelected = !selectedEmail.isSelected;
  return data;
};
