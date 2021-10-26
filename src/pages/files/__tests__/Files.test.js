import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Files from "../Files";
import { getFiles } from "../../../util/APIUtils";

jest.mock("../../../util/APIUtils");

afterEach(cleanup);

describe("File unit tests", () => {
  test("Renders 'home' breadcrumb", async () => {
    // Arrange
    getFiles.mockResolvedValueOnce({});

    act(() => {
      render(<Files />);
    });

    // Assert
    expect(getFiles).toHaveBeenCalledTimes(1);
    const breadcrumbsHomeEl = await screen.findByText("Home");
    expect(breadcrumbsHomeEl).toBeInTheDocument();
  });

  test("Folders and Files are rendered", async () => {
    getFiles.mockResolvedValueOnce(testUserData);

    act(() => {
      render(<Files />);
    });

    const folderAButtonEl = await screen.findByText("folderA");
    const folderBButtonEl = await screen.findByText("folderB");
    expect(folderAButtonEl).toBeInTheDocument();
    expect(folderBButtonEl).toBeInTheDocument();

    const listNode = await screen.findByTestId("files");
    expect(listNode.children).toHaveLength(7);
  });

  test("Navigate into folder. Breadcrumbs rendered correctly and files/folders updated", async () => {
    getFiles.mockResolvedValueOnce(testUserData);

    act(() => {
      render(<Files />);
    });

    // Click into a folder
    const folderAButtonEl = await screen.findByText("folderA");
    act(() => {
      userEvent.click(folderAButtonEl);
    });

    expect(getFiles).toHaveBeenCalledTimes(1);
    const breadcrumbsHomeEl = await screen.findByText("Home");
    expect(breadcrumbsHomeEl).toBeInTheDocument();

    // The button above will have been removed from the DOM, so only 1 element should be found with this query
    const breadcrumbFolderAEls = await screen.findAllByText("folderA");
    expect(breadcrumbFolderAEls.length).toBe(1);
    expect(breadcrumbFolderAEls[0]).toBeInTheDocument();

    // Now check that the child folders have been rendered.
    const folderBButtonEl = await screen.findByText("folderA");
    expect(folderBButtonEl).toBeInTheDocument();
  });
});

const testUserData = {
  id: "616d69a11030583f9ac3b579",
  folderName: null,
  files: [
    {
      internalFileReference: "84127829-3d87-408a-a337-12ea5ec2b8c7.csv",
      fileName: "status_report.csv",
      userId: "616c1ae571ca252feb7fea75",
      created: "2021-10-19T11:59:56.036",
    },
    {
      internalFileReference: "94c290d2-16ff-4068-84e0-109f9cd584e5.pdf",
      fileName: "Cheat-Sheet.pdf",
      userId: "616c1ae571ca252feb7fea75",
      created: "2021-10-19T11:14:12.204",
    },
    {
      internalFileReference: "44493a71-af45-4e3d-a1a6-f22d72b81bc2.txt",
      fileName: "file.txt",
      userId: "616c1ae571ca252feb7fea75",
      created: "2021-10-19T11:57:32.945",
    },
    {
      internalFileReference: "c9d55905-a1c7-4b94-88d2-be0dc6b89c0f.csv",
      fileName: "FileName.csv",
      userId: "616c1ae571ca252feb7fea75",
      created: "2021-10-19T11:59:06.791",
    },
    {
      internalFileReference: "74c05401-36e5-460a-a857-f78d9c91d1b2.zip",
      fileName: "01-starting-project.zip",
      userId: "616c1ae571ca252feb7fea75",
      created: "2021-10-19T12:28:54.163",
    },
  ],
  subdirectories: [
    {
      id: null,
      folderName: "folderA",
      files: [],
      subdirectories: [
        {
          id: null,
          folderName: "folder2",
          files: [
            {
              internalFileReference: "a6f80f06-0135-42e8-b739-1745ab26642d.png",
              fileName: "Screenshot 2021-10-11 at 09.55.12.png",
              userId: "616c1ae571ca252feb7fea75",
              created: "2021-10-18T14:09:50.588",
            },
          ],
          subdirectories: [],
          userId: null,
          userRootDir: false,
          created: "2021-10-18T14:09:50.588",
        },
      ],
      userId: null,
      userRootDir: false,
      created: "2021-10-18T14:09:50.588",
    },
    {
      id: null,
      folderName: "folderB",
      files: [],
      subdirectories: [
        {
          id: null,
          folderName: "December",
          files: [
            {
              internalFileReference: "9597e051-4dec-43d6-bd39-7ff762eee247.pdf",
              fileName: "AWS.pdf",
              userId: "616c1ae571ca252feb7fea75",
              created: "2021-10-19T12:19:43.459",
            },
          ],
          subdirectories: [],
          userId: null,
          userRootDir: false,
          created: "2021-10-19T12:19:43.457",
        },
      ],
      userId: null,
      userRootDir: false,
      created: "2021-10-19T12:19:43.457",
    },
  ],
  userId: "616c1ae571ca252feb7fea75",
  userRootDir: true,
  created: "2021-10-18T13:33:37.92",
};
