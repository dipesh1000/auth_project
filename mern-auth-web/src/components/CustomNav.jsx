import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { SiFusionauth } from 'react-icons/si';
import { IoMdLogIn } from 'react-icons/io';
import { useAuth } from '../hooks/useAuth';
import axiosInstance from '../utils/AxiosInstance';

export default function CustomNav() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const handleLogout = async () => {
    const response = await axiosInstance.post('/auth/logout');
    if (response.status === 200) {
      logout();
    }
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <SiFusionauth className="text-2xl mr-2" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Auth
        </span>
      </Navbar.Brand>
      <div className="flex  md:order-2">
        {isAuthenticated ? (
          <div className="flex items-center">
            <span className="block truncate text-sm font-medium pr-4">
              {user.email}
            </span>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.username}</span>
              </Dropdown.Header>

              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : (
          <Button
            gradientDuoTone="tealToLime"
            onClick={() => navigate('/login')}
          >
            <span>Login</span>
            <IoMdLogIn className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
