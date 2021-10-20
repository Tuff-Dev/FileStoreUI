import { Button } from "@mui/material";
import React, { useContext } from "react";
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
                  <NavLink to="/files">
                    <Button variant="outlined">Files</Button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile">
                    <Button variant="text">Profile</Button>
                  </NavLink>
                </li>
                <li>
                  <Button variant="text" onClick={props.onLogout}>
                    Logout
                  </Button>
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
