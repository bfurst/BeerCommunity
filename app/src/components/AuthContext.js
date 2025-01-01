import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated, login } from '../services/Api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await isAuthenticated();
    if (Object.keys(user).length > 0) {
      setIsAuth(true);
      setUser(user);
    }
    else {
      setIsAuth(false);
      setUser('');
    }
  };

  const auth = async (credenentials) => {
    try {
      const data = await login(credenentials);
      if (data["status"] === 200) {
        localStorage.setItem('token', data["token"]);
        checkAuth();
      }

      return data;

    } catch (exception) {
      throw new Error(`An error occurred during login process: ${exception}`);
    }
  };

  const updateUserProfileImage = (url) => {
    setUser((prevState) => ({
      ...prevState,
      profileImage: url,
    }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    setUser('');
  };

  const authContextValue = {
    isAuth,
    user,
    auth,
    updateUserProfileImage,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;