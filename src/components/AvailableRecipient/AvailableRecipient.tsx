import { FC, ReactElement, useEffect, useState } from 'react';
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
import { IGroupedOption } from '../../models/autocomplete.model';
import { DispatchTypeEnum } from '../../types/dispatch.type';
import { AlertTypeEnum } from '../../types/alert.type';
import CSAutocomplete from '../sharedComponents/CSAutocomplete';
import { getGroupedOptions, onRemoveDomain, onRemoveEmail } from './helpers';
import {
  availableRecipientRoot,
  availableRecipientWrapper,
  singleRecipientContainer,
  accordionHeader,
  accordionButtonHover,
  accordionPanelBodyStyle,
} from './AvailableRecipient.styled';

const AvailableRecipient: FC = (): ReactElement => {
  const { data, onDispatch, onEnableAlertDialog, onEnableToast } = useLayoutContext();
  const [groupedOptions, setGroupedOptions] = useState<IGroupedOption[]>([]);

  useEffect(() => {
    const options = getGroupedOptions(data.availableRecipients);
    setGroupedOptions(options);
  }, [data]);

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
    <Box
      boxShadow='lg'
      p='6'
      rounded='md'
      bg='white'
      h='68vh'
      sx={availableRecipientRoot}
    >
      <h1>
        Available Recipients
      </h1>
      <CSAutocomplete groupedOptions={groupedOptions} />
      <Box
        boxShadow='xs'
        p='6'
        rounded='md'
        minW={400}
        maxH={data.isInvalidEmail ? '70%' : '73%'}
        overflow='auto'
        sx={availableRecipientWrapper}
      >
        {data.availableRecipients.map((recipient) => {
          if (recipient.data.length === 1) {
            const { email, isSelected, id } = recipient.data[0];
            return (
              <div
                key={id}
                style={singleRecipientContainer}
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
                <h2 style={accordionHeader}>
                  <Checkbox
                    isChecked={recipient.data.every((item) => item.isSelected)}
                    isIndeterminate={recipient.data.some((item) => item.isSelected) && !recipient.data.every((item) => item.isSelected)}
                    onChange={(e) => recipient.data.forEach((item) => handleChange(e.target.checked, item))}
                  />
                  <AccordionButton _hover={accordionButtonHover}>
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
                      <div style={accordionPanelBodyStyle}>
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
