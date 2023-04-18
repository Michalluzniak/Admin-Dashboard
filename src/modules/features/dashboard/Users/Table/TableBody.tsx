import { UserListProps } from '../../../../../types/userTypes';
import { UserRow } from './UserRow';

type Props = {
  users: UserListProps[];
  userIdHandler: (id: string, modal: string) => void;
  table: any;
};
export const TableBody = ({ users, userIdHandler, table }: Props) => {
  return (
    <tbody>
      {users &&
        users.map((user: UserListProps, i: number) => (
          <UserRow table={table} index={i} key={user.id} userIdHandler={userIdHandler} {...user}></UserRow>
        ))}
    </tbody>
  );
};
