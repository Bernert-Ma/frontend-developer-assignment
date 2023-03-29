import React, {
  FC,
  ReactElement,
  Reducer,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { default as mockedData } from '../assets/recipientsData.json';
import  reducer, { initialState } from '../reducer/recipients.reducer';
import { IDomainData, IAvailableRecipient } from '../models/recipients.model';
import { IAction, IInitialState } from '../models/initialState.model';
import { DispatchTypeEnum } from '../types/dispatch.type';
import { getAvailableRecipient } from './helpers';
import { LayoutContext } from './hooks/useLayoutContext';
import { ILayoutContextProps } from '../models/layoutContext.model';
import AvailableRecipient from './AvailableRecipient';
import SelectedRecipient from './SelectedRecipient';
import CSAlertDialog from './CSAlertDialog';
import { IAlertDialogContent } from '../models/alertDialog.model';
import { IToastProps } from '../models/toast.model';

const Layout: FC = (): ReactElement => {
  const [state, dispatch] = useReducer<Reducer<IInitialState, IAction>>(
    reducer,
    initialState,
  );
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [alertDialogContent, setAlertDialogContent] = useState<IAlertDialogContent>();

  const toast = useToast();

  useEffect(() => {
    const availableRecipient: IAvailableRecipient[] = getAvailableRecipient(mockedData as IDomainData[]);
    if (availableRecipient) {
      dispatch({
        type: DispatchTypeEnum.SET_AVAILABLE_RECIPIENTS,
        payload: {
          data: availableRecipient
        },
      });
    }
  }, []);

  const handleToast = useCallback((props: IToastProps) => {
    toast({
      title: props.message,
      description: props.subTitle || '',
      status: props.alterStatus,
      duration: props.duration || 5000,
      isClosable: true,
    });
  }, [toast]);

  const handleAlertDialog = useCallback((content: IAlertDialogContent) => {
    setAlertDialogContent(content);
    setOpenAlertDialog(true);
  }, [setAlertDialogContent, setOpenAlertDialog]);

  const ctx = useMemo<ILayoutContextProps>(() => ({
    data: state,
    onDispatch: dispatch,
    onEnableToast: handleToast,
    onEnableAlertDialog: handleAlertDialog,
  }), [
    state,
    dispatch,
    handleToast,
    handleAlertDialog,
  ]);

  return (
    <LayoutContext.Provider value={ctx}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Box
          display='flex'
          height='calc(100vh - 40px)'
          alignItems="center"
          justifyContent="space-around"
          sx={{
            '@media screen and (max-width: 580px)': {
              display: 'grid'
            }
          }}
        >
          <AvailableRecipient />
          <SelectedRecipient />
        </Box>
        <CSAlertDialog
          open={openAlertDialog}
          content={alertDialogContent}
          onClose={() => setOpenAlertDialog(false)}
        />
      </React.Suspense>
    </LayoutContext.Provider>
    );
};

export default Layout;
