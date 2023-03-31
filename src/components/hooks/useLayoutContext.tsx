import React from "react";
import { ILayoutContextProps } from "../../models/layoutContext.model";
import { initialState } from "../../reducer/recipients.reducer";

export const defaultCtx: ILayoutContextProps = {
  data: initialState,
  onDispatch: () => {},
  onEnableToast: () => {},
  onEnableAlertDialog: () => {},
};

export const LayoutContext =
  React.createContext<ILayoutContextProps>(defaultCtx);

export function useLayoutContext() {
  return React.useContext(LayoutContext);
}
