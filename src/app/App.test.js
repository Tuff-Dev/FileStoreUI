import { act, render, screen } from "@testing-library/react";
import App from "./App";

describe("App tests", () => {
  test("Renders", () => {
    act(() => {
      render(<App />);
    });
  });
});

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   act(() => {
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
// });
