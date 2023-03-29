export interface ISelectedEmail {
  id: number;
  email: string;
}

export interface IDomainData {
  id?: number;
  email: string;
  isSelected: boolean;
}

export interface IAvailableRecipient {
  id: number;
  domain: string;
  data: Array<IDomainData>;
}
