import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, CardActions, IconButton, InputAdornment } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (userInfo) {
      history("/mynotes");
    }
  }, [userInfo]);
  const handleClick = async (e) => {
    e.preventDefault();

    await dispatch(register(name, email, password, file));
    if (userInfo) {
      setOpen(true);
    }
  };
  console.log(error);
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Card varient="outlined" sx={{ p: 3 }}>
        <CardContent>
          {/* {error != "" && <Alert severity="error">{error}</Alert>} */}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth={true}
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            size="medium"
            inputProps={{
              autocomplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            placeholder="Choose a password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth={true}
            margin="normal"
            size="medium"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              autocomplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            placeholder="Enter your Name"
            fullWidth={true}
            margin="normal"
            size="medium"
            inputProps={{
              autocomplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth={true}
            startIcon={<CloudUploadIcon />}
            component="label"
            // size="large"
          >
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
        </CardContent>
        <CardActions>
          <LoadingButton
            fullWidth={true}
            variant="contained"
            color="primary"
            loading={loading}
            onClick={handleClick}
            endIcon={<PersonAddIcon />}
            loadingPosition="end"
            // size="large"
          >
            Sign Up
          </LoadingButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Signup;
