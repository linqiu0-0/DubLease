import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
<<<<<<< HEAD
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import useAuth from "../hooks/useAuth";


function AccountMenu({ username, userId}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { authed, logout } = useAuth();
 
=======
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

export default function AccountMenu({ username }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();


>>>>>>> frontend
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
<<<<<<< HEAD
        logout();
        navigate('/');
=======
        navigate('/', {
            state: {
                username: data.username
            }
        });
>>>>>>> frontend
    };

    const handleProfile = () => {
        navigate('/profile', {
            state: {
<<<<<<< HEAD
                username: username,
                userId: userId
            }
        });
    };

    const handleListings = () => {
        navigate('/listings', {
            state: {
                username: username,
                userId: userId
=======
                username: username
>>>>>>> frontend
            }
        });
    };






    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
                <MenuItem onClick={handleProfile}>
                    <Avatar /> Profile
                </MenuItem>
<<<<<<< HEAD
                <MenuItem onClick={handleListings}>
                <ListItemIcon>
                    <FormatListBulletedIcon fontSize="small" /> 
                    </ListItemIcon>
                      My Listings
=======
                <MenuItem onClick={handleClose}>
                    <Avatar /> My Listings
>>>>>>> frontend
                </MenuItem>
                <Divider />

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
<<<<<<< HEAD
                    Log out
=======
                    Logout
>>>>>>> frontend
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export { AccountMenu }