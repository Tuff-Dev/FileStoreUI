import { useContext, useEffect } from "react";
import AuthContext from "../../store/AuthContext";
import LoginForm from "./LoginForm";
import { GOOGLE_AUTH_URL } from "../../constants";
import googleLogo from "../../img/google-logo.png";
import Alert from "react-s-alert-v3";
import { Link, Redirect } from "react-router-dom";

const Login = (props) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.
    if (props.location.state && props.location.state.error) {
      setTimeout(() => {
        Alert.error(props.location.state.error, {
          timeout: 5000,
        });
        props.history.replace({
          pathname: props.location.pathname,
          state: {},
        });
      }, 100);
    }
  }, []);

  if (authContext.authenticated) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location },
        }}
      />
    );
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login to FileStore</h1>
        <div className="social-login">
          <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" /> Log in with Google
          </a>
        </div>
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm {...props} />
        <span className="signup-link">
          New user? <Link to="/signup">Sign up!</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
