import { InputProps } from 'reactstrap';

export interface Props extends InputProps {
  name: string;
  label?: string;
  col?: string;
}

// CUSTOM HOOKS
export interface UserRemoveModalFooterProps {
  email: string;
  id: string;
  userRemoveInputValue: string;
  isError: boolean;
  isLoading: boolean;
  submitButtonError: boolean;
  removeUser: (id: string) => void;
  setSubmitButtonError: (item: boolean) => void;
  toggleHandler: () => void;
}
// LOADERS
export interface LoaderProps {
  size?: string;
  position?: 'static' | 'absolute' | 'relative' | 'fixed';
  top?: string;
  left?: string;
  className?: string;
}

// PAGINATION
export interface PaginationProps {
  previousPage: number;
  currentPage: number;
  nextPage: number;
  loadPage(num: number): void;
  totalPages: number;
}

// FIELDS
// Phone Field + Phone Dial Codes interfaces
export interface PhoneCodesBtnProps {
  codeHandler: (code: string) => void;
  dialCodeFromNumbers?: string;
}
export interface CountriesValues {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}
