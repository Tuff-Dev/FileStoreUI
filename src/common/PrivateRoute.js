import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  // const authCtx = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
