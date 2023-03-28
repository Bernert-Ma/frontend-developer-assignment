import React, { FC, ReactElement, Reducer, useReducer, useEffect, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
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

const Layout: FC = (): ReactElement => {
  const [state, dispatch] = useReducer<Reducer<IInitialState, IAction>>(
    reducer,
    initialState,
  );

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

  const ctx = useMemo<ILayoutContextProps>(() => ({
    data: state,
    onDispatch: dispatch,
  }), [state]);

  return (
    <LayoutContext.Provider value={ctx}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Box
          display='flex'
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
      </React.Suspense>
    </LayoutContext.Provider>
    );
};

export default Layout;
