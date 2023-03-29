import { FC, ReactElement, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { useLayoutContext } from '../hooks/useLayoutContext';
import { IAvailableRecipient, ISelectedEmail } from '../../models/recipients.model';

const SelectedRecipient: FC = (): ReactElement => {
  const { data } = useLayoutContext();
  const [selectedCompanies, setSelectedCompanies] = useState<IAvailableRecipient[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<ISelectedEmail[]>([]);

  useEffect(() => {
    const companies = data.availableRecipients.map((recipient) => ({
      ...recipient,
      data: recipient.data.filter((item) => item.isSelected),
    }));
    const emails = data.availableRecipients.map((recipient) => recipient.data.filter((item) => item.isSelected))
      .flat()
      .map((item) => ({id: item.id, email: item.email}));

    setSelectedCompanies(companies);
    setSelectedEmails(emails);
  }, [data]);

  return (
    <Box boxShadow='lg' p='6' rounded='md' bg='white'>
      <h1 style={{ paddingBottom: 16 }}>
        Selected Recipients
      </h1>
      <Box boxShadow='xs' p='6' rounded='md' minWidth={400}>
        <Accordion allowMultiple>
          <AccordionItem border='none'>
            <h2>
              <AccordionButton _hover={{ bgColor: 'none' }}>
                <AccordionIcon />
                <Box as="span" flex='1' textAlign='left'>
                  Company Recipiens
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {selectedCompanies.map((company) => {
                if (!company.data.length) {
                  return null;
                }
                return (
                  <Accordion key={company.id} allowToggle>
                    <AccordionItem border='none'>
                      <h2>
                        <AccordionButton _hover={{ bgColor: 'none' }}>
                          <AccordionIcon />
                          <Box as="span" flex='1' textAlign='left'>
                            {company.domain}
                          </Box>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {company.data.map((item) => (
                          <div key={item.id} style={{ paddingLeft: '42px' }}>
                            {item.email}
                          </div>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                )
              })}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border='none'>
            <h2>
              <AccordionButton _hover={{ bgColor: 'none' }}>
                <AccordionIcon />
                <Box as="span" flex='1' textAlign='left'>
                  Email Recipiens
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {selectedEmails.map((item) => (
                <div key={item.id} style={{ paddingLeft: '42px' }}>
                  {item.email}
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default SelectedRecipient;
