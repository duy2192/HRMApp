import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuUser from "components/Menu/MenuUser";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagementList from "./ManagementList";
import logo from "assets/img/logo1.png"
import avatar from "assets/img/avatar.png"
import SearchBox from "./SearchBox";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "#fff",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    background: "#263A4E",
    color:"#fff",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", 
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                color: "#34495e",
                marginRight: "10px",
                // ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="#34495e"
              noWrap
              sx={{ flexGrow: 0, cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={logo}
                alt=""
                style={{ width: "80px", height: "45px" }}
              />
              Thông tin nhân sự
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="#34495e"
              noWrap
              sx={{ flexGrow: 1, cursor: "pointer",display:"inline" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <SearchBox/>
            </Typography>
            
              <IconButton>
                <NotificationsNoneIcon sx={{
                  color:"#222f3e"
                }}/>
                </IconButton>
            <IconButton color="inherit" onClick={handleUserClick}>
              <Avatar
                src={avatar}
                alt="Avatar"
              />
            </IconButton>
            <MenuUser handleCloseMenu={handleCloseMenu} anchorEl={anchorEl} />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Divider />
          <List style={{ marginTop: "80px" }}>
            <ManagementList>

            </ManagementList>
          </List>

          <Divider />
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex",
              px: [1],
            }}
          >
            {open ? (
              <>
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon style={{ color: "#fff" }} />
                </IconButton>
                <Typography color="#fff" style={{ paddingLeft:"20px" }}>Thu gọn</Typography>
              </>
            ) : (
              <IconButton onClick={toggleDrawer}>
                <ChevronRightIcon style={{ color: "#fff" }} />
              </IconButton>
            )}
          </Toolbar>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: "rgba(196, 196, 196, 0.32);",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}></Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function AdminFeature() {
  return <DashboardContent />;
}
