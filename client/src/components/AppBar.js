import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, SvgIcon } from "@mui/material";
import { ReactComponent as Logo } from '../assets/images/DubLeaseLogo.svg';
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { AccountMenu } from "./AccountMenu";
import useAuth from "../hooks/useAuth.jsx";


const pages = ['Home', 'Add Lease'];

function MainAppBar() {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleNavMenu = (page) => {
        // Navigate to AddPost page
        if (pages.indexOf(page) == 0) {
            navigate('/');
        }
        if (pages.indexOf(page) == 1) {
            if(auth.authed) {
                navigate('/post');
            } else{
                window.alert("You have to login before posting a property")
            }
            
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
                        <SvgIcon component="a" fontSize="large" href="/home" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, pt: 1 }}>
                            <Logo />
                        </SvgIcon>


                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
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
                        {auth.authed ?
                            <Box sx={{ flexGrow: 0 }}>
                                <AccountMenu />
                            </Box>
                            : <Box sx={{ flexGrow: 0, display: { md: 'flex' }, gap: 1 }}>
                                <Button
                                    variant='contained'
                                    color="inherit"
                                    onClick={()=>{navigate('signin')}}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    sx={{ display: { xs: 'none', md: 'flex' }, color: 'white', borderColor: 'white'}}
                                    onClick={()=>{navigate('signup')}}
                                >
                                    Sign Up
                                </Button>

                            </Box>
                        }
                    </Toolbar>
                </Box>
            </AppBar>
        </ThemeProvider>
    );
}


export default MainAppBar;