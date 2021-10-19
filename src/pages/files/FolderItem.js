import FolderIcon from "@mui/icons-material/Folder";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const FolderItem = (props) => {
  const changeFolderHandler = () => {
    props.changeFolder(props.folder.folderName);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={changeFolderHandler}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={props.folder.folderName} />
      </ListItemButton>
    </ListItem>
  );
};

export default FolderItem;
