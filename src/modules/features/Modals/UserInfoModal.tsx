import { useEffect } from 'react';
import {
  Modal as ModalElement,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';
import { userInfoModalProps } from '../../../types/modalTypes';
import wave from '../../../assets/svg/wave.svg';

export const UserInfoModal = ({ userInfoToggleHandler, isModalOpen, user, setUser }: userInfoModalProps) => {
  const userValues = user && Object.entries(user);

  // Set user state to null after component unmounts
  useEffect(() => {
    return () => {
      setUser(null);
    };
  }, [setUser]);

  return (
    <ModalElement centered size='lg' isOpen={isModalOpen} toggle={() => userInfoToggleHandler('toggle')}>
      <ModalHeader
        toggle={() => userInfoToggleHandler('toggle')}
        style={{ backgroundImage: `url(${wave})`, backgroundSize: 'cover', color: 'white' }}
      >
        User Details
      </ModalHeader>
      <ModalBody>
        {user && (
          <ListGroup>
            {userValues &&
              userValues.map((value) => (
                //
                <ListGroupItem key={value[0]}>
                  <Badge
                    style={{
                      width: '15%',
                      margin: '0 15px 0 0',
                      padding: '10px 0px',
                    }}
                    className='badge-user-info'
                  >
                    {value[0]}
                  </Badge>
                  {value[1]}
                </ListGroupItem>
                //
              ))}
          </ListGroup>
        )}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => userInfoToggleHandler('toggle')}>Close</Button>
      </ModalFooter>
    </ModalElement>
  );
};
