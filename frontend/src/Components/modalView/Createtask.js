import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createtaskAction } from "../../actions/taskAction";

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  const [task_status, setTaskstatus] = React.useState(false);
  const taskCreate = useSelector((state) => state.taskCreate);
  const { loading, error, note } = taskCreate;

  console.log(note);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createtaskAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history("/mynotes");
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>CreateTask</Button>
      <Button onClick={handleClickOpen("body")}>scroll=body</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">CreateYourTask</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <TextField
            placeholder="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            placeholder="category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            placeholder="Task"
            multiline
            fullWidth
            rows={5}
            maxRows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetHandler}>Reset fields</Button>
          <Button onClick={submitHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
