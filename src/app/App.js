import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { getCurrentUser } from "../util/APIUtils";
import AppHeader from "../common/AppHeader";
import Home from "../home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Profile from "../pages/profile/Profile";
import OAuth2RedirectHandler from "../pages/oauth2/OAuth2RedirectHandler";
import NotFound from "../common/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import PrivateRoute from "../common/PrivateRoute";
import AuthContext from "../store/AuthContext";
import Alert from "react-s-alert-v3";
import "react-s-alert-v3/dist/s-alert-default.css";
import "react-s-alert-v3/dist/s-alert-css-effects/slide.css";
import "./App.css";
import { ACCESS_TOKEN } from "../constants";
import Files from "../pages/files/Files";

const App = () => {
  const authCtx = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authCtx.authenticated) {
      getCurrentUser()
        .then((response) => {
          authCtx.setCurrentUser(response);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [authCtx]);

  const logoutHandler = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    authCtx.setCurrentUser(null);
    Alert.success("You're safely logged out!");
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="app">
      <div className="app-top-box">
        <AppHeader onLogout={logoutHandler} />
      </div>
      <div className="app-body">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute
            authenticated={authCtx.authenticated}
            path="/profile"
            component={Profile}
          ></PrivateRoute>
          <PrivateRoute
            authenticated={authCtx.authenticated}
            path="/files"
            component={Files}
          ></PrivateRoute>
          <Route path="/login" render={(props) => <Login {...props} />}></Route>
          <Route
            path="/signup"
            render={(props) => <Signup {...props} />}
          ></Route>
          <Route
            path="/oauth2/redirect"
            component={OAuth2RedirectHandler}
          ></Route>
          {/* DEFAULT ROUTE */}
          <Route component={NotFound}></Route>
        </Switch>
      </div>
      <Alert
        stack={{ limit: 3 }}
        timeout={5000}
        position="top-right"
        effect="slide"
        offset={65}
      />
    </div>
  );
};

export default App;
