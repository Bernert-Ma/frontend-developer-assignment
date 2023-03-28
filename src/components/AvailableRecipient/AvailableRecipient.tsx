import { FC, ReactElement } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Stack
} from '@chakra-ui/react';
import { useLayoutContext } from '../hooks/useLayoutContext';
import { IAvailableRecipient, IDomainData } from '../../models/recipients.model';
import { DispatchTypeEnum } from '../../types/dispatch.type';

const AvailableRecipient: FC = (): ReactElement => {
  const { data, onDispatch } = useLayoutContext();

  const handleChange = (checked: boolean, selectedItem: IDomainData) => {
    const recipientObj: IAvailableRecipient = data.availableRecipients.find(recipient => recipient.data.some(item => item.id === selectedItem.id));
    const selectedItemObj: IDomainData = recipientObj.data.find(item => item.id === selectedItem.id);
    selectedItemObj.isSelected = checked;

    onDispatch({
      type: DispatchTypeEnum.CHANGE_EMAIL_SELECTION,
      payload: {
        data: data.availableRecipients
      }
    });
  };

  return (
    <Box boxShadow='lg' p='6' rounded='md' bg='white'>
      <h1 style={{ paddingBottom: 16 }}>
        Available Recipients
      </h1>
      <Box boxShadow='xs' p='6' rounded='md' minWidth={400}>
        {data.availableRecipients.map((recipient) => {
          if (recipient.data.length === 1) {
            const { email, isSelected, id } = recipient.data[0];

            return (
              <div key={id} style={{ padding: '8px 19px' }}>
                <Checkbox
                  isChecked={isSelected}
                  onChange={(e) => handleChange(e.target.checked, recipient.data[0])}
                >
                  {email}
                </Checkbox>
              </div>
            );
          }

          return (
            <Accordion key={recipient.id} defaultIndex={[0]} allowToggle>
              <AccordionItem key={recipient.id} border='none'>
                <h2 style={{ display: 'flex', paddingLeft: '19px' }}>
                  <Checkbox
                    isChecked={recipient.data.every((item) => item.isSelected)}
                    isIndeterminate={recipient.data.some((item) => item.isSelected) && !recipient.data.every((item) => item.isSelected)}
                    onChange={(e) => recipient.data.forEach((item) => handleChange(e.target.checked, item))}
                  />
                  <AccordionButton _hover={{ bgColor: 'none' }}>
                    <AccordionIcon />
                    <Box as="span" flex='1' textAlign='left'>
                      {recipient.domain}
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {recipient.data.map((item) => (
                    <Stack key={item.id} pl={6} mt={1} spacing={1}>
                      <Checkbox
                        isChecked={item.isSelected}
                        onChange={(e) => handleChange(e.target.checked, item)}
                      >
                        {item.email}
                      </Checkbox>
                    </Stack>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )
        })}
      </Box>
    </Box>
  )
};

export default AvailableRecipient;
