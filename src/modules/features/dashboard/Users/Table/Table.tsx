import { useState, useRef } from 'react';
//MODALS
import { Modal } from '../../../Modals/CreateEditUserModal/Modal';
import { UserInfoModal } from '../../../Modals/UserInfoModal';
//TABLE ELEMENTS
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { Table as TableElement, Button } from 'reactstrap';
// LOADERS & ERRORS
import { Loader } from '../../../../../components/shared/Loader';
import { ErrorAlert } from '../../../../../components/shared/ErrorAlert';
// CUSTOM HOOKS
import { useUsersList } from '../hooks/useUsersList';
//PAGINATION
import { Pagination } from '../Pagination';
// AXIOS REQUESTS
import { getUserById } from '../../../../../api/users';
// INTERFACES
import { InitialValuesPropsWithId } from '../../../../../types/formTypes';
// import { useIsMobile } from '../../../../../hooks/useIsMobile';

export const Table = () => {
  const { isLoading, isError, usersList, previousPage, currentPage, nextPage, loadPage, totalPages } = useUsersList();

  const [isMainModalOpen, setIsMainModalOpen] = useState<boolean>(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState<boolean>(false);
  // USERS LIST
  const [user, setUser] = useState<InitialValuesPropsWithId | null>(null);
  const [tableScroll, setTableScroll] = useState<number>();

  // const isMobile = useIsMobile();

  const toggleMainModalHandler = () => {
    setIsMainModalOpen(!isMainModalOpen);
  };

  const toggleUserInfoHandler = () => {
    setIsUserInfoModalOpen(!isUserInfoModalOpen);
  };

  const userIdHandler = (id: string, modal: string) => {
    const getUser = async () => {
      try {
        let res = await getUserById(id);
        setUser(res);
        if (modal === 'edit') {
          toggleMainModalHandler();
        } else if (modal === 'info') {
          toggleUserInfoHandler();
        }
      } catch (err) {}
    };
    getUser();
  };

  // const table = document.querySelector('.table-container-important ');

  const table: any = useRef(null);

  return (
    <div className='container-fluid container-md p-0'>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorAlert>errorValue</ErrorAlert>
      ) : (
        <>
          <div className='d-flex justify-content-between p-3 w-100'>
            <h2 className='ms-4'>Users</h2>
            <Button
              style={{
                backgroundColor: '#007EA7',
              }}
              onClick={toggleMainModalHandler}
            >
              New User
            </Button>
            {isMainModalOpen ? (
              <Modal
                isModalOpen={isMainModalOpen}
                toggleHandler={toggleMainModalHandler}
                user={user}
                setUser={setUser}
              />
            ) : null}
            {isUserInfoModalOpen ? (
              <UserInfoModal
                userInfoToggleHandler={toggleUserInfoHandler}
                isModalOpen={isUserInfoModalOpen}
                user={user}
                setUser={setUser}
              />
            ) : null}
          </div>

          <div className='table-container'>
            {/* <div className='header-table'>{isMobile && <TableHead />}</div> */}
            <div
              className='table-container-important'
              ref={table}
              onScroll={() => {
                // console.log(userSettingsIcon.current.scrollTop);
                setTableScroll(table.current.scrollTop);
              }}
            >
              <TableElement hover>
                <TableHead />
                <TableBody table={tableScroll} users={usersList} userIdHandler={userIdHandler} />
              </TableElement>
            </div>
          </div>
        </>
      )}
      {!isLoading && (
        <Pagination
          previousPage={previousPage}
          currentPage={currentPage}
          nextPage={nextPage}
          loadPage={loadPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
