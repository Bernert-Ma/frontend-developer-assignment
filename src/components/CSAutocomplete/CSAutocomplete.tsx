import { FC, ReactElement, useEffect, useState } from 'react';
import { Box, FormControl, FormErrorMessage, theme } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { useLayoutContext } from '../hooks/useLayoutContext';
import { DispatchTypeEnum } from '../../types/dispatch.type';
import { AlertTypeEnum } from '../../types/alert.type';

interface Option {
  value: string;
  label: string;
}

interface GroupedOption {
  label: string;
  options: Option[];
}

const CSAutocomplete: FC = (): ReactElement => {
  const { data, onDispatch, onEnableToast } = useLayoutContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<GroupedOption[]>([]);
  const [value, setValue] = useState<Option | null>();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  // TODO:
  // Create delete recipient reducer method
  // Render only selected recipient

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
  }, [data.availableRecipients]);

  useEffect(() => {
    if (options.length) {
      setIsLoading(false);
    }
  }, [options]);

  const createOption = (label: string) => ({
    label,
    value: new Date().getTime().toString(),
  });

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValue(newOption);
    if (!emailRegex.test(inputValue)) {
      setIsInvalid(true);
      return;
    };
    const domain = inputValue.split('@')[1];
    const domainIndex = data.availableRecipients.findIndex((item) => item.domain === domain);
    if (domainIndex > -1) {
      data.availableRecipients[domainIndex].data.push({
        id: parseInt(newOption.value),
        email: newOption.label,
        isSelected: false,
      });
      onDispatch({
        type: DispatchTypeEnum.ADD_RECIPIENT,
        payload: {
          data: data.availableRecipients.sort((a, b) => b.data.length - a.data.length),
        },
      });
      onEnableToast({
        message: 'Email has been successfully created',
        alterStatus: AlertTypeEnum.SUCCESS
      });
    } else {
      data.availableRecipients.push({
        id: new Date().getTime(),
        domain,
        data: [{
          id: parseInt(newOption.value),
          email: newOption.label,
          isSelected: false,
        }],
      });
      onDispatch({
        type: DispatchTypeEnum.ADD_RECIPIENT,
        payload: {
          data: data.availableRecipients.sort((a, b) => b.data.length - a.data.length),
        },
      });
      onEnableToast({
        message: 'Email has been successfully created',
        alterStatus: AlertTypeEnum.SUCCESS
      });
    }
  };

  const handleChange = (newValue: Option | null) => {
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
