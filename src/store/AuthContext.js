import React, { useState } from "react";
import { getCurrentUser } from "../util/APIUtils";
const AuthContext = React.createContext({
  authenticated: false,
  currentUser: {},
  setCurrentUser: () => {},
  setAuthenticated: () => {},
});

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setCurrentUser] = useState();

  const setUser = (user) => {
    setCurrentUser(user);
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const setAuthenticatedHandler = (isAuthenticated) => {
    setIsAuthenticated(isAuthenticated);

    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  };

  const authContext = {
    authenticated: isAuthenticated,
    currentUser: user,
    setCurrentUser: setUser,
    setAuthenticated: setAuthenticatedHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
