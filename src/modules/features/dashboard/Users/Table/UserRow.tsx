import { useRef, useState } from 'react';
// REACT ICONS
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
//INTERFACES
import { User as UserProps } from '../../../../../types/userTypes';
// MODAL
import { UserRemoveModal } from '../../../Modals/RemoveModal/UserRemoveModal';
import { useIsMobile } from '../../../../../hooks/useIsMobile';

export const UserRow = ({
    username,
    email,
    createdAt,
    id,
    userIdHandler,
    index,
    table,
}: UserProps) => {
    const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] =
        useState<boolean>(false);
    const [isUserSettingModalOpen, setIsUserSettingModalOpen] =
        useState<boolean>(false);

    const toggleRemoveUserHandler = () => {
        setIsRemoveUserModalOpen(!isRemoveUserModalOpen);
    };

    const isMobile = useIsMobile();

    const userSettingsIcons: any = useRef();

    // useEffect(() => {
    //   // console.log(table || 0);
    //   userSettingsIcons.current.scrollTop = '100';

    //   console.log(userSettingsIcons.current.scrollTop);
    // }, [table]);

    return (
        <>
            <UserRemoveModal
                open={isRemoveUserModalOpen}
                toggleHandler={toggleRemoveUserHandler}
                username={username}
                email={email}
                id={id}
            />
            <tr>
                <td style={{ minWidth: '20%' }}>{username}</td>
                <td style={{ minWidth: '30%' }}>{email}</td>
                <td style={{ minWidth: '20%' }}>{createdAt.slice(0, 10)}</td>

                {isMobile ? (
                    <td ref={userSettingsIcons}>
                        <div
                            className='user-settings-icons-mobile'
                            style={
                                isUserSettingModalOpen
                                    ? { transform: 'translateX(-65%)' }
                                    : { transform: 'translateX(50%)' }
                            }
                        >
                            <div style={{ minWidth: '10%' }}>
                                <AiOutlineSearch
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                    }}
                                    onClick={() => userIdHandler(id, 'info')}
                                />
                            </div>
                            <div style={{ minWidth: '10%' }}>
                                <AiFillEdit
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        userIdHandler(id, 'edit');
                                    }}
                                />
                            </div>
                            <div style={{ minWidth: '10%' }}>
                                <BsFillTrashFill
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setIsRemoveUserModalOpen(true);
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className='settings-icons'
                            onClick={() => {
                                setIsUserSettingModalOpen(
                                    !isUserSettingModalOpen
                                );
                            }}
                        >
                            <FiSettings></FiSettings>
                        </div>
                    </td>
                ) : (
                    <>
                        <td style={{ minWidth: '10%' }}>
                            <AiOutlineSearch
                                style={{ cursor: 'pointer', fontSize: '18px' }}
                                onClick={() => userIdHandler(id, 'info')}
                            />
                        </td>
                        <td style={{ minWidth: '10%' }}>
                            <AiFillEdit
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    userIdHandler(id, 'edit');
                                }}
                            />
                        </td>
                        <td style={{ minWidth: '10%' }}>
                            <BsFillTrashFill
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setIsRemoveUserModalOpen(true);
                                }}
                            />
                        </td>
                    </>
                )}
            </tr>
        </>
    );
};
