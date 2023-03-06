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
import {AccountMenu} from "./AccountMenu";

const pages = ['Home', 'Add Lease'];

function MainAppBar({ username, userId }) {
    const navigate = useNavigate();

    const handleNavMenu = (page) => {
        // Navigate to AddPost page
        if (pages.indexOf(page) == 0) {
            navigate('/home');
        }
        if (pages.indexOf(page) == 1) {
            navigate('/post');
        }
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
                        <SvgIcon component="a" fontSize="large" href="/home" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, pt:1 }}>
                            <Logo />
                        </SvgIcon>


                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handleNavMenu(page)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <AccountMenu username={username} userId={userId}/>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>
        </ThemeProvider>
    );
}
export default MainAppBar;