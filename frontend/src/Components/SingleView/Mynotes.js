import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { listtask } from "../../actions/taskAction";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 16,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Mynotes() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const { TASK } = taskList;
  const classes = useStyles();
  console.log(TASK);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(listtask());
  }, []);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
      <Grid container alignItems="stretch" direction="row">
        {TASK != undefined
          ? TASK.map((taskObj) => (
              <Grid item>
                <Card
                  onClick={handleClick}
                  className={classes.card}
                  sx={{ width: 300 }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {<b>{(taskObj?.title).slice(0, 40)}</b>}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {(taskObj?.content).slice(0, 40)}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        padding: "0.4rem",
                        backgroundColor: "#F9F9F9",
                      }}
                    >
                      <Typography
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Hello
                      </Typography>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
}

export default Mynotes;
