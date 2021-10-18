import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext";

ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
