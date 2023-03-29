import { FC, ReactElement, useEffect, useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
 } from '@chakra-ui/react';
import { IAlertDialogProps } from '../../models/alertDialog.model';

const CSAlertDialog: FC<IAlertDialogProps> = ({ open, content, onClose }): ReactElement => {
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(open);
  const cancelRef = useRef(null);

  useEffect(() => {
    setOpenAlertDialog(open);
  }, [open]);

  const handleClose = () => {
    setOpenAlertDialog(false);
    if (onClose) onClose();
  };

  const handleConfirmChange = (res: boolean) => {
    content?.dialogResponse(res);
    handleClose();
  };

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      isOpen={openAlertDialog}
      leastDestructiveRef={cancelRef}
      onClose={() => setOpenAlertDialog(false)}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {content?.headerText}
          </AlertDialogHeader>
          <AlertDialogBody>
            {content?.bodyText}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => handleConfirmChange(false)}>
              {content?.dismissButtonText}
            </Button>
            <Button colorScheme='red' onClick={() => handleConfirmChange(true)} ml={3}>
              {content?.confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CSAlertDialog;
