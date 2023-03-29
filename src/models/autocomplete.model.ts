export interface IOption {
  value: string;
  label: string;
}

export interface IGroupedOption {
  label: string;
  options: IOption[];
}
