import { FC, ReactElement } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useLayoutContext } from '../hooks/useLayoutContext';
import { IAvailableRecipient, IDomainData } from '../../models/recipients.model';
import { DispatchTypeEnum } from '../../types/dispatch.type';
import CSAutocomplete from '../CSAutocomplete';
import { AlertTypeEnum } from '../../types/alert.type';
import { onRemoveDomain, onRemoveEmail } from './helpers';

const AvailableRecipient: FC = (): ReactElement => {
  const { data, onDispatch, onEnableAlertDialog, onEnableToast } = useLayoutContext();

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

  const handleDeleteRecipient = (id: number, isSingleItem: boolean) => {
    let updatedRecipients: IAvailableRecipient[] = [];
    isSingleItem ?
      updatedRecipients = onRemoveEmail(data.availableRecipients, id) :
      updatedRecipients = onRemoveDomain(data.availableRecipients, id);

    onDispatch({
      type: DispatchTypeEnum.REMOVE_RECIPIENT,
      payload: {
        data: updatedRecipients,
      },
    });
  };

  return (
    <Box boxShadow='lg' p='6' rounded='md' bg='white' h='68vh'>
      <h1>
        Available Recipients
      </h1>
      <CSAutocomplete />
      <Box boxShadow='xs' p='6' rounded='md' minW={400} maxH={data.isInvalidEmail ? 444.5 : 469} overflow='auto'>
        {data.availableRecipients.map((recipient) => {
          if (recipient.data.length === 1) {
            const { email, isSelected, id } = recipient.data[0];
            return (
              <div
                key={id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0px 8px 19px'
                }}
              >
                <Checkbox
                  isChecked={isSelected}
                  onChange={(e) => handleChange(e.target.checked, recipient.data[0])}
                >
                  {email}
                </Checkbox>
                <IconButton
                  variant='ghost'
                  colorScheme='blue'
                  aria-label={`Delete ${email}`}
                  size='sm'
                  ml='2px'
                  icon={<DeleteIcon />}
                  onClick={() => onEnableAlertDialog({
                    headerText: 'Delete Email',
                    bodyText: `Are you sure you want to delete ${email}?`,
                    dismissButtonText: 'Cancel',
                    confirmButtonText: 'Delete',
                    dialogResponse: (val: boolean) => {
                      if (val) {
                        handleDeleteRecipient(id, true);
                        onEnableToast({
                          message: 'Email has been deleted',
                          alterStatus: AlertTypeEnum.ERROR,
                        });
                      }
                    },
                  })}
                />
              </div>
            );
          }

          return (
            <Accordion key={recipient.id} defaultIndex={[0]} allowToggle>
              <AccordionItem key={recipient.id} border='none'>
                <h2 style={{ display: 'flex', alignItems: 'center', paddingLeft: '19px' }}>
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
                  <IconButton
                    variant='ghost'
                    colorScheme='blue'
                    aria-label={`Delete ${recipient.domain}`}
                    size='sm'
                    ml='2px'
                    icon={<DeleteIcon />}
                    onClick={() => onEnableAlertDialog({
                      headerText: 'Delete Domain',
                      bodyText: `Are you sure you want to delete the domain ${recipient.domain}?`,
                      dismissButtonText: 'Cancel',
                      confirmButtonText: 'Delete',
                      dialogResponse: (val: boolean) => {
                        if (val) {
                          handleDeleteRecipient(recipient.id, false);
                          onEnableToast({
                            message: 'Doamin has been deleted',
                            alterStatus: AlertTypeEnum.ERROR,
                          });
                        }
                      },
                    })}
                  />
                </h2>
                <AccordionPanel pb={4} pr={0}>
                  {recipient.data.map((item) => (
                    <Stack key={item.id} pl={6} mt={1} spacing={1}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox
                          isChecked={item.isSelected}
                          onChange={(e) => handleChange(e.target.checked, item)}
                        >
                          {item.email}
                        </Checkbox>
                        <IconButton
                          variant='ghost'
                          colorScheme='blue'
                          aria-label={`Delete ${item.email}`}
                          size='sm'
                          ml='2px'
                          icon={<DeleteIcon />}
                          onClick={() => onEnableAlertDialog({
                            headerText: 'Delete Email',
                            bodyText: `Are you sure you want to delete ${item.email}?`,
                            dismissButtonText: 'Cancel',
                            confirmButtonText: 'Delete',
                            dialogResponse: (val: boolean) => {
                              if (val) {
                                handleDeleteRecipient(item.id, true);
                                onEnableToast({
                                  message: 'Email has been deleted',
                                  alterStatus: AlertTypeEnum.ERROR,
                                });
                              }
                            },
                          })}
                        />
                      </div>
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
