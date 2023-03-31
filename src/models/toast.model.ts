import { AlertTypeEnum } from "../types/alert.type";

export interface IToastProps {
  message: string;
  alterStatus: AlertTypeEnum;
  subTitle?: string;
  duration?: number;
}
