export interface InitialValuesProps {
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  biography?: string;
  website?: string;
  birthday?: string;
}

export type InitialValuesPropsForEdit = Omit<InitialValuesProps, 'email' | 'username' | 'password'>;

export interface InitialValuesPropsWithId extends InitialValuesProps {
  id: string;
}

export type initialValueWithoutPassword = Omit<InitialValuesProps, 'password'>;

export interface FormProps {
  createUser?: (valuesObj: InitialValuesProps) => Promise<void>;
  setIsError: () => void;
  isError: boolean;
  user: InitialValuesPropsWithId | null;
  editCurrentUser(id: string, val: InitialValuesPropsForEdit, initialUserValues: InitialValuesPropsForEdit): void;
  toggleSaveButtonOnEdit: (item: boolean) => void;
  setUser: (key: InitialValuesPropsWithId) => void;
}
