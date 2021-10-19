import classes from "./Files.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import { getFiles } from "../../util/APIUtils";
import LoadingIndicator from "../../common/LoadingIndicator";
import Folder from "./FolderItem";
import FileItem from "./FileItem";
import Button from "@mui/material/Button";
import { Divider, Grid } from "@mui/material";
import UploadModal from "./UploadModal";

const BreadcrumbLink = (props) => {
  const clickHandler = () => {
    props.setPath(props.path);
  };

  return (
    <Link underline="hover" path={props.path} onClick={clickHandler}>
      {props.item}
    </Link>
  );
};

const Files = () => {
  const [loading, setLoading] = useState(false);
  const [userFiles, setUserFiles] = useState();
  const [currentPath, setCurrentPath] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const closeUploadModalHandler = () => {
    setShowUploadModal(false);
  };

  const showUploadModalHandler = () => {
    setShowUploadModal(true);
  };

  const changeFolderHandler = (folderName) => {
    setCurrentPath((path) => {
      return [...path, folderName];
    });
  };

  const setPath = (path) => {
    setCurrentPath(path);
  };

  const goHome = () => {
    setPath([]);
  };

  let workingPath = [];

  const breadcrumbs = currentPath.map((item) => {
    workingPath.push(item);
    return (
      <BreadcrumbLink
        key={item}
        path={workingPath.slice()}
        setPath={setPath}
        item={item}
      />
    );
  });

  let combinedFilesAndFolders = [];
  // Navigate to the correct folder base on the path
  if (userFiles) {
    let workingLevel = userFiles;

    currentPath.forEach((pathSegment) => {
      workingLevel = workingLevel.subdirectories.find(
        (el) => el.folderName === pathSegment
      );
    });

    const folders = workingLevel.subdirectories.map((dir) => {
      return (
        <Folder
          folder={dir}
          changeFolder={changeFolderHandler}
          key={dir.folderName}
        />
      );
    });

    combinedFilesAndFolders = [
      ...folders,
      workingLevel.files.map((item) => {
        return <FileItem key={item.internalFileReference} file={item} />;
      }),
    ];
  }

  useEffect(() => {
    setLoading(true);
    getFiles()
      .then((response) => {
        setUserFiles(response);
      })
      .catch((error) => {})
      .finally(setLoading(false));
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.files}>
      <UploadModal
        open={showUploadModal}
        handleClose={closeUploadModalHandler}
      />
      <div className={classes["folder-path"]}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" onClick={goHome}>
              Home
            </Link>
            {breadcrumbs}
          </Breadcrumbs>
          <div className={classes["folder-path__upload"]}>
            <Button variant="outlined" disabled>
              Create new folder
            </Button>
            <Button variant="contained" onClick={showUploadModalHandler}>
              Upload File
            </Button>
          </div>
        </Grid>

        <Divider />
      </div>
      <div className={classes["item-list"]}>
        <List>{combinedFilesAndFolders}</List>
      </div>
    </div>
  );
};

export default Files;
