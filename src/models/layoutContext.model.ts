import React from 'react';
import { IAlertDialogContent } from './alertDialog.model';
import { IAction, IInitialState } from './initialState.model';
import { IToastProps } from './toast.model';

export interface ILayoutContextProps {
  data: IInitialState;
  onDispatch: React.Dispatch<IAction>;
  onEnableToast: (props: IToastProps) => void;
  onEnableAlertDialog: (content: IAlertDialogContent) => void;
}
