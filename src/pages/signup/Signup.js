import React, { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import "./Signup.css";
import { Link, Redirect } from "react-router-dom";
import { GOOGLE_AUTH_URL } from "../../constants";
import googleLogo from "../../img/google-logo.png";
import SignupForm from "./SignupForm";

const Signup = () => {
  const authCtx = useContext(AuthContext);

  if (authCtx.authenticated) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: this.props.location },
        }}
      />
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Sign up to FileStore</h1>
        <div className="social-signup">
          <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" /> Sign up with Google
          </a>
        </div>
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <SignupForm />
        <span className="login-link">
          Already have an account? <Link to="/login">Login!</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
