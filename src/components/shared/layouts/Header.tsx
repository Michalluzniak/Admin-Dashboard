import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Button, Navbar, NavbarBrand } from 'reactstrap';
import { clearSession, isAuthenticated } from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import wave from '../../../assets/svg/wave.svg';

export const Header = () => {
  let navigate = useNavigate();

  return isAuthenticated() ? (
    <Navbar
      dark
      style={{
        height: '8vh',
        padding: '0 2em',
        backgroundImage: `url(${wave})`,
        backgroundSize: '100% auto',
      }}
    >
      <NavbarBrand href='/'>Dashboard</NavbarBrand>

      <Button
        color='dark'
        className='btn-outline-light border-0'
        style={{
          backgroundColor: '#00171F',
        }}
        onClick={() => {
          clearSession();
          navigate('/');
        }}
      >
        <span className='me-2 align-middle'>Logout</span>
        <RiLogoutBoxRLine style={{ fontSize: '28px' }} />
      </Button>
    </Navbar>
  ) : null;
};
