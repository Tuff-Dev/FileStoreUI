import React, { Component, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import "./AppHeader.css";

const AppHeader = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="container">
        <div className="app-branding">
          <Link to="/" className="app-title">
            FileStore
          </Link>
        </div>
        <div className="app-options">
          <nav className="app-nav">
            {authCtx.authenticated ? (
              <ul>
                <li>
                  <NavLink to="/files">Files</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <a onClick={props.onLogout}>Logout</a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
