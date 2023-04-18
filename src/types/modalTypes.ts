import { InitialValuesPropsWithId } from './formTypes';

export interface ModalProps {
  isModalOpen: boolean;
  toggleHandler: () => void;
  user: InitialValuesPropsWithId | null;
  setUser: (key: InitialValuesPropsWithId | null) => void;
}

export interface userInfoModalProps {
  userInfoToggleHandler: (item: string) => void;
  isModalOpen: boolean;
  user: InitialValuesPropsWithId | null;
  setUser(user: InitialValuesPropsWithId | null): void;
}

// User remove modal
export interface UserRemoveModalProps {
  username: string;
  email: string;
  open: boolean;
  id: string;
  toggleHandler: () => void;
}

export interface UserRemoveModalBodyProps {
  username: string;
  email: string;
  errorMessage: string;
  userRemoveInputValue: string;
  isError: boolean;
  setUserRemoveInputValue: (value: string) => void;
}
