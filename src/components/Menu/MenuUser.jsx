import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logOut } from 'features/Auth/authSlice';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import avatar from 'assets/img/avatar.png';
import { useNavigate } from 'react-router-dom';

MenuUser.propTypes = {
    handleCloseMenu: PropTypes.func, 
};

function MenuUser(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {handleCloseMenu,anchorEl}=props
    const handleLogoutClick=()=>{
    const action = logOut()
    dispatch(action)
    navigate('/user/login')
    }
    return (
        <div>
                  <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={avatar}
                alt="Avatar" /> Thông tin tài khoản
        </MenuItem>
        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" style={{color:"#222f3e"}}/>
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" style={{color:"#222f3e"}}/>
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
        </div>
    );
}

export default MenuUser;