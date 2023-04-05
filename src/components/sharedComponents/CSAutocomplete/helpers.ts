import { IOption } from "../../../models/autocomplete.model";
import {
  IAvailableRecipient,
  IDomainData,
} from "../../../models/recipients.model";

/**
 * Creates a new option with a given label and a unique value based on the current timestamp
 * @param label The label of the new option
 * @returns An object representing the new option
 */
export const onCreateNewOption = (label: string): IOption => ({
  label,
  value: new Date().getTime().toString(),
});

/**
 * Adds a new option to the list of available recipients based on the user input
 * @param inputValue The user input
 * @param newOption The new option to add to the list of available recipients
 * @param data An array of available recipient
 * @returns An updated array of available recipient including the new option
 */
export const onCreateOption = (
  inputValue: string,
  newOption: IOption,
  data: IAvailableRecipient[]
): IAvailableRecipient[] => {
  const domain = inputValue.split("@")[1];
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
      data: [
        {
          id: parseInt(newOption.value),
          email: newOption.label,
          isSelected: false,
        },
      ],
    });
  }
  return data;
};

/**
 * Handles the selection of the autocomplete value.
 * Updates the isSelected property of the selected email.
 * @param option The selected option
 * @param data An array of available recipients
 * @returns An updated array of available recipient
 */
export const onSelecteNewValue = (
  option: IOption,
  data: IAvailableRecipient[]
): IAvailableRecipient[] => {
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
