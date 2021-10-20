import classes from "./Files.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";
import { uploadFile } from "../../util/APIUtils";

const UploadModal = (props) => {
  const [selectedFiles, setSelectedFiles] = useState();
  const [currentFile, setCurrentFile] = useState();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const fileSelectHandler = (event) => {
    setSelectedFiles(event.target.files);
  };

  const uploadHandler = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    uploadFile(currentFile, "/", (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((response) => {
      setError(false);
      props.handleClose();
    });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      className={classes.modal}
    >
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the files you wish to upload.
        </DialogContentText>
        <input type="file" onChange={fileSelectHandler} multiple />
        <div className={classes.progress}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                progress
              )}%`}</Typography>
            </Box>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={uploadHandler}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;
