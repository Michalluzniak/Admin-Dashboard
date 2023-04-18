export interface User {
  index: number;
  username: string;
  email: string;
  createdAt: string;
  id: string;
  userIdHandler: (id: string, modal: string) => void;
  table: any;
}

export interface UserListProps {
  createdAt: string;
  email: string;
  id: string;
  updatedAt: string;
  username: string;
}
