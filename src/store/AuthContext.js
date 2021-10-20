import React, { useState } from "react";
import { getCurrentUser } from "../util/APIUtils";
const AuthContext = React.createContext({
  authenticated: false,
  currentUser: {},
  loading: false,
  setCurrentUser: () => {},
  setAuthenticated: () => {},
  setLoading: () => {},
});

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const setUser = (user) => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setCurrentUser(user);
  };

  const setAuthenticatedHandler = (isAuthenticated) => {
    setIsAuthenticated(isAuthenticated);

    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const authContext = {
    authenticated: isAuthenticated,
    currentUser: user,
    loading: loading,
    setCurrentUser: setUser,
    setAuthenticated: setAuthenticatedHandler,
    setLoading: setLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
