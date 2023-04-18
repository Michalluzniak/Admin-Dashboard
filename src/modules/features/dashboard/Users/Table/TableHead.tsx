import { RiUserSettingsFill } from 'react-icons/ri';

export const TableHead = () => {
  return (
    <thead style={{ position: 'sticky', top: '0', backgroundColor: '#03171F', color: '#fff' }}>
      <tr>
        <th>Username</th>
        <th>E-mail</th>
        <th>Created at</th>
        <th>Details</th>
        <th>Edit</th>
        <th>Remove</th>
        <th className='header-td'>
          <RiUserSettingsFill />
        </th>
      </tr>
    </thead>
  );
};
