import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import { login } from "../../../util/APIUtils";
import Alert from "react-s-alert-v3";

jest.mock("../../../util/APIUtils");
jest.mock("react-s-alert-v3");

afterEach(cleanup);

describe("LoginForm component tests", () => {
  test("Renders email and password fields and Login button", () => {
    render(<LoginForm />);

    const emailEl = screen.getByPlaceholderText("Email");
    expect(emailEl).toHaveClass("form-control");
    expect(emailEl).toHaveProperty("name", "email");
    expect(emailEl).toHaveAttribute("type", "email");

    const passwordEl = screen.getByPlaceholderText("Password");
    expect(passwordEl).toHaveClass("form-control");
    expect(passwordEl).toHaveProperty("name", "password");
    expect(passwordEl).toHaveAttribute("type", "password");

    expect(emailEl).toBeInTheDocument();
    expect(passwordEl).toBeInTheDocument();

    const loginBtnEl = screen.getByRole("button");
    expect(loginBtnEl).toBeInTheDocument();
  });

  test("State is updated on email and password change", () => {
    render(<LoginForm />);

    const emailEl = screen.getByPlaceholderText("Email");
    const passwordEl = screen.getByPlaceholderText("Password");

    emailEl.value = "entered Email";
    passwordEl.value = "ueiuhgtg";

    expect(screen.getByPlaceholderText("Email")).toHaveValue("entered Email");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("ueiuhgtg");
  });

  // const renderComponent = ({ name }) => {
  //   render(
  //     <LocalStorageMock items={{ name }}>
  //       <LoginForm />
  //     </LocalStorageMock>
  //   );
  // };

  test("Login Form submission", async () => {
    render(<LoginForm />);

    const emailEl = screen.getByPlaceholderText("Email");
    const passwordEl = screen.getByPlaceholderText("Password");

    emailEl.value = "test@test.com";
    passwordEl.value = "password";

    const buttonEl = screen.getByRole("button");

    const tokenResponse = { accessToken: "abc123" };
    login.mockResolvedValueOnce(tokenResponse);

    Alert.success.mockImplementation(() => {
      return;
    });

    userEvent.click(buttonEl);

    expect(await Alert.success).toHaveBeenCalledTimes(1);

    expect(localStorage.getItem("accessToken")).toBe("abc123");
  });
});
