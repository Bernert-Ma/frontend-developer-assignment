import { FC, ReactElement, useEffect, useState } from 'react';
import { Box, FormControl, FormErrorMessage, theme } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { useLayoutContext } from '../hooks/useLayoutContext';
import { DispatchTypeEnum } from '../../types/dispatch.type';
import { AlertTypeEnum } from '../../types/alert.type';
import { onCreateNewOption, onCreateOption, onSelecteNewValue } from './helpers';
import { IGroupedOption, IOption } from '../../models/autocomplete.model';
import { IAvailableRecipient } from '../../models/recipients.model';

const CSAutocomplete: FC = (): ReactElement => {
  const { data, onDispatch, onEnableToast } = useLayoutContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<IGroupedOption[]>([]);
  const [value, setValue] = useState<IOption | null>();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const groupedOptions = data.availableRecipients.map((item) => ({
      label: item.domain,
      options: item.data.map((dataItem) => ({
        value: dataItem.id.toString(),
        label: dataItem.email,
      })),
    }));
    setOptions(groupedOptions);
  }, [data]);

  useEffect(() => {
    if (options.length) {
      setIsLoading(false);
    }
  }, [options]);

  const handleCreate = (inputValue: string) => {
    const newOption: IOption = onCreateNewOption(inputValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValue(newOption);
    if (!emailRegex.test(inputValue)) {
      setIsInvalid(true);
      return;
    };
    const updatedRecipients: IAvailableRecipient[] = onCreateOption(inputValue, newOption, data.availableRecipients);
    onDispatch({
      type: DispatchTypeEnum.ADD_RECIPIENT,
      payload: {
        data: updatedRecipients.sort((a, b) => b.data.length - a.data.length),
      },
    });
    onEnableToast({
      message: 'Email has been successfully created',
      alterStatus: AlertTypeEnum.SUCCESS
    });
  };

  const handleChange = (newValue: IOption | null) => {
    if (newValue) {
      const updatedRecipients: IAvailableRecipient[] = onSelecteNewValue(newValue, data.availableRecipients);
      onDispatch({
        type: DispatchTypeEnum.CHANGE_EMAIL_SELECTION,
        payload: {
          data: updatedRecipients,
        },
      });
    }
    setIsInvalid(false);
    setValue(newValue);
  };

  return (
    <Box maxW="md" mt={8} mb={8}>
      <FormControl p={4} isInvalid>
        <CreatableSelect
          focusBorderColor={isInvalid ? theme.colors.red[500] : theme.colors.blue[500]}
          isInvalid={isInvalid}
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={(newValue) => handleChange(newValue)}
          onCreateOption={handleCreate}
          options={options}
          value={value}
        />
        {isInvalid && (
          <FormErrorMessage>
            Invalid email address
          </FormErrorMessage>
        )}
      </FormControl>
    </Box>
  )
};

export default CSAutocomplete;
