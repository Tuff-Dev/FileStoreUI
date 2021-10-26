import { render, screen, cleanup } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe("Login tests", () => {
  test("Renders social login links", () => {
    render(
      <Router>
        <Login location={{}} />
      </Router>
    );

    const googleAuthBtnEl = screen.getByText("Log in with Google");
    expect(googleAuthBtnEl).toBeInTheDocument();
  });
});
