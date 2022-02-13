import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
const useStyles=makeStyles({
  root:{
    color:'#f5f6fa',
  },
  icon:{
    color:'#f5f6fa'
  }
})
export default function ManagementList(){
  const navigate =useNavigate()
  const classes=useStyles()
  const handleClick=(to)=>{
    navigate (to)
  }
  return (
    <Box className={classes.root}>
      <ListItem button onClick={()=>{handleClick("/")}}  >
        <ListItemIcon>
          <CottageOutlinedIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Tổng quan" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <PersonIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Hồ sơ" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <AssignmentIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Hợp đồng" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <PersonAddAlt1Icon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Bổ nhiệm" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <PersonOffIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Miễn nhiệm" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <CompareArrowsIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Thuyên chuyển" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <PersonRemoveIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Nghỉ việc" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <AssignmentTurnedInIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Khen thưởng" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <SettingsIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Thiết lập" />
      </ListItem>
      <ListItem button onClick={()=>{handleClick("/")}}>
        <ListItemIcon>
          <FlagIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Báo cáo" />
      </ListItem>
    </Box>
  );
} 
