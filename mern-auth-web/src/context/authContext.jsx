import { useEffect, useState } from 'react';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }) => {
  let userInfo =
    Boolean(localStorage.getItem('userInfo')) &&
    JSON.parse(localStorage.getItem('userInfo'));
  let accessToken =
    Boolean(localStorage.getItem('accessToken')) &&
    JSON.parse(localStorage.getItem('accessToken'));

  const [user, setUser] = useState(userInfo ?? null);
  const [token, setToken] = useState(accessToken ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const login = (data) => {
    setUser(data.data.data);
    setToken(data.accessToken);
    localStorage.setItem('userInfo', JSON.stringify(data.data.data));
    localStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
    localStorage.setItem(
      'refreshToken',
      JSON.stringify(data.data.refreshToken)
    );
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (user && token) {
      setIsAuthenticated(true);
    }
  }, [user, token]);
  return (
    <>
      <AuthContext.Provider
        value={{ login, token, user, logout, isAuthenticated }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
