import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    color: "#f5f6fa",
  },
  icon: {
    color: "#f5f6fa",
  },
  list: {
    marginTop: "10px",
  },
});
export default function ManagementList() {
  const navigate = useNavigate();
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.current);
  const handleClick = (to) => {
    navigate(to);
  };

  return (
    <Box className={classes.root}>
      <ListItem
        button
        onClick={() => {
          handleClick("/");
        }}
      >
        <ListItemIcon>
          <CottageOutlinedIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Tổng quan" />
      </ListItem>

      <ListItem
        className={classes.list}
        button
        onClick={() => {
          handleClick("/ho-so");
        }}
      >
        <ListItemIcon>
          <PersonIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Hồ sơ" />
      </ListItem>
      <ListItem
        className={classes.list}
        button
        onClick={() => {
          handleClick("/don-vi");
        }}
      >
        <ListItemIcon>
          <MeetingRoomIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Đơn vị" />
      </ListItem>
      <ListItem
        className={classes.list}
        button
        onClick={() => {
          handleClick("/trinh-do");
        }}
      >
        <ListItemIcon>
          <LightbulbIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Trình độ" />
      </ListItem>
      <ListItem
        className={classes.list}
        button
        onClick={() => {
          handleClick("/chuc-vu");
        }}
      >
        <ListItemIcon>
          <PersonOffIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Chức vụ" />
      </ListItem>
      {loggedInUser?.user.role == 3 && (
        <ListItem
          className={classes.list}
          button
          onClick={() => {
            handleClick("/tai-khoan");
          }}
        >
          <ListItemIcon>
            <ManageAccountsIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Tài khoản" />
        </ListItem>
      )}
      <ListItem
        className={classes.list}
        button
        onClick={() => {
          handleClick("/thiet-lap");
        }}
      >
        <ListItemIcon>
          <SettingsIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Thiết lập" />
      </ListItem>
      <ListItem
        className={classes.list}
        button
        onClick={() => {
          handleClick("/bao-cao");
        }}
      >
        <ListItemIcon>
          <FlagIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Báo cáo" />
      </ListItem>
    </Box>
  );
}
