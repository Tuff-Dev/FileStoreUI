import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileItem from "../FileItem";

afterEach(cleanup);

const createTestFile = () => {
  return {
    internalFileReferenc: "123456.csv",
    fileName: "test.csv",
    userId: "uc8UI84jfksdf",
    created: "2021-10-19T10:59:56.036Z",
  };
};

describe("FileItem Unit tests", () => {
  test("Renders file name", () => {
    // Arrange
    const testFile = createTestFile();

    render(<FileItem file={testFile} />);

    // Assert
    const fileNameEl = screen.getByText(testFile.fileName, { exact: true });
    expect(fileNameEl).toBeInTheDocument();
  });

  test("Does not initially render confirmation modal", () => {
    // Arrange
    const testFile = createTestFile();

    render(<FileItem file={testFile} />);

    // Assert
    const confirmationDialogEl = screen.queryByRole("dialog");
    expect(confirmationDialogEl).not.toBeInTheDocument();
  });

  test("Confirmation dialog is rendered when file clicked", () => {
    // Arrange
    const testFile = createTestFile();

    render(<FileItem file={testFile} />);

    // Act
    const button = screen.getByRole("button");
    userEvent.click(button);

    // Assert
    const dialogEl = screen.getByRole("dialog");
    expect(dialogEl).toBeInTheDocument();
  });
});
