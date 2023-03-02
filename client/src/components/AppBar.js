import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {createTheme, SvgIcon} from "@mui/material";
import { ReactComponent as Logo } from '../assets/images/DubLeaseLogo.svg';
import {ThemeProvider} from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {AccountMenu} from "./AccountMenu"

const pages = ['Home', 'Message', 'Add Lease', 'About Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function MainAppBar({ username, userId }) {
    console.log("app bar" + userId)
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
                        <SvgIcon component="a" fontSize="large" href="/home" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, pt:"4px" }}>
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
                            {/* <Button variant="contained" sx={{mr: 3}}  onClick={handleViewProfile}>View Profile</Button> */}
                            {/* <Button variant="contained" sx={{mr: 3}}  onClick={handleViewProfile}>View Profile</Button> */}
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {/* <Avatar alt={username} src="/static/images/avatar/2.jpg" /> */}
                                <AccountMenu username={username} userId={userId}/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>
        </ThemeProvider>
    );
}
export default MainAppBar;