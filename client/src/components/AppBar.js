import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {createTheme, SvgIcon} from "@mui/material";
import { ReactComponent as Logo } from '../assets/images/DubLeaseLogo.svg';
import {ThemeProvider} from "@emotion/react";
import { useNavigate } from "react-router-dom";

const pages = ['Home', 'Message', 'Add Lease', 'About Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function MainAppBar({ username }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleViewProfile = () => {
        navigate('/profile', {
            state: {
              username: "Lin"
            }
          });
    }

    const customTheme = createTheme({
        palette: {
            secondary: {
                main: "#ab47bc",
                contrastText: "#6a0dad "
            }
        }
    });

    return (
        <ThemeProvider theme={customTheme}>
            <AppBar color={"secondary"} position="static" sx={{ height: '4rem' }}>
                <Box
                    sx={{
                    paddingX: 5,
                    }}
                >
                    <Toolbar disableGutters>
                        <SvgIcon component="a" href="/" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                            <Logo />
                        </SvgIcon>


                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Button variant="contained" sx={{mr: 3}}  onClick={handleViewProfile}>View Profile</Button>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>
        </ThemeProvider>
    );
}
export default MainAppBar;