import React from "react";
import { Box, Button, Typography } from '@mui/material';

const NotFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#ab47bc',
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'white' }}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" href="/" sx={{my: 2}}>Back Home</Button>
        </Box>
    );
};

export default NotFound;

