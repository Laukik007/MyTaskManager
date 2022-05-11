import background from "../Extras/background.jpg";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Mynotes from "../Components/SingleView/Mynotes";
import Myprofile from "../Components/SingleView/Myprofile";
import Explore from "../Components/SingleView/Explore";
import About from "../Components/SingleView/About";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Homepage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ display: "flex" }}
      style={{
        background: ` linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${background}) top left / cover no-repeat`,
        width: "100%",
        height: "100vh",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Kal kar lete hai != success
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            onClick={() => setTab(0)}
            style={
              tab == 0
                ? {
                    backgroundColor: "rgb(25,118,210)",
                    borderTopRightRadius: "24px",
                    borderBottomRightRadius: "24px",
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <NoteAltIcon style={tab == 0 ? { color: "white" } : {}} />
              </ListItemIcon>
              <ListItemText primary={"My Notes"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setTab(1)}
            style={
              tab == 1
                ? {
                    backgroundColor: "rgb(25,118,210)",
                    borderTopRightRadius: "24px",
                    borderBottomRightRadius: "24px",
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <ExploreIcon style={tab == 1 ? { color: "white" } : {}} />
              </ListItemIcon>
              <ListItemText primary={"Explore"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            disablePadding
            onClick={() => setTab(2)}
            style={
              tab == 2
                ? {
                    backgroundColor: "rgb(25,118,210)",
                    borderTopRightRadius: "24px",
                    borderBottomRightRadius: "24px",
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon style={tab == 2 ? { color: "white" } : {}} />
              </ListItemIcon>
              <ListItemText primary={"My Profile"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setTab(3)}
            style={
              tab == 3
                ? {
                    backgroundColor: "rgb(25,118,210)",
                    borderTopRightRadius: "24px",
                    borderBottomRightRadius: "24px",
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon style={tab == 3 ? { color: "white" } : {}} />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            disablePadding
            onClick={() => setTab(4)}
            style={
              tab == 4
                ? {
                    backgroundColor: "rgb(25,118,210)",
                    borderTopRightRadius: "24px",
                    borderBottomRightRadius: "24px",
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon style={tab == 4 ? { color: "white" } : {}} />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div>
          {tab == 0 ? (
            <Mynotes />
          ) : tab == 1 ? (
            <Explore />
          ) : tab == 2 ? (
            <Myprofile />
          ) : tab == 4 ? (
            <About />
          ) : null}
        </div>
      </Main>
    </Box>
  );
}
