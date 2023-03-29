import { ReactElement } from 'react';

export interface IAlertDialogContent {
  headerText: string | ReactElement;
  bodyText: string | ReactElement;
  confirmButtonText: string | ReactElement;
  dismissButtonText: string | ReactElement;
  dialogResponse: (...args: any) => void;
  onDismiss?: (val: boolean) => void;
}

export interface IAlertDialogProps {
  open: boolean;
  content: IAlertDialogContent | undefined;
  onClose: () => void;
}
