import { useContext, useState } from "react";
import "./Login.css";
import { login } from "../../util/APIUtils";
import { ACCESS_TOKEN } from "../../constants";
import Alert from "react-s-alert-v3";
import AuthContext from "../../store/AuthContext";

const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputChangeHandler = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;

    if (inputName === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const loginRequest = Object.assign(
      {},
      {
        email,
        password,
      }
    );

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        authCtx.setAuthenticated(true);
        Alert.success("You're successfully logged in!");
        props.history.push("/");
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={inputChangeHandler}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={inputChangeHandler}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
