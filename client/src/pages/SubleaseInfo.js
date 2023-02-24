import React from "react";
import {Box, Button, Container, Divider, Paper, Typography} from '@mui/material';
import MainAppBar from "../components/AppBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import Map from "../components/Map";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import rentalFeatures from "../assets/static/rentalFeatures.json";
import ImagesCarousel from "../components/ImagesCarousel";

const SubleaseInfo = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <MainAppBar username={"Tony Song"}/>
            <Container fixed>

                <Button
                    sx={{mt: 2, p: 0, px: 1}}
                    size="medium"
                    color="secondary"
                    variant="contained" onClick={
                    () => {
                        navigate(-1);
                    }
                }>
                    <ArrowBackIcon />
                    <Typography variant="button" component="span" p={1}>
                        Back Home
                    </Typography>
                </Button>

                <Typography variant="h4" component="h1" p={1}>
                    Hub U District
                </Typography>
                <Typography variant="subtitle1" component="div" p={1}>
                    5000 University Way NE
                </Typography>
                {/*<Typography variant="subtitle1" component="div" p={1}>*/}
                {/*    Post Time: 02/07/2023 / Last Edit Time: 02/07/2023*/}
                {/*</Typography>*/}
                <Box marginTop={2} sx={{height: 550 }}>
                    <ImagesCarousel />
                </Box>
                {/*<Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />*/}
                <Typography variant="h6" component="div" p={1}>
                    Description
                </Typography>
                <Typography variant="body" component="div" p={1}>
                    Check out that Custom Backyard Entertaining space! 3237saft, 4 Bedrooms, 2 Bathrooms house
                    Lake Villa street in the Palm Harbor neighborhood of Texas. Well cared for with tons of upgrades! Newe
                    stainless steel appliances will stay with the unit, including dishwasher, fridge, stove, microwave, and
                    washer and dryer.
                </Typography>

                <Typography variant="h6" component="div" p={1}>
                    Rental Features
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={3} mx={1}>
                    {
                        rentalFeatures.map((features) => (
                            <Grid key={features.label} item xs={6}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography align="left" variant="body" component="div">
                                        {features.label}
                                    </Typography>
                                    <Typography align="right" variant="body" component="div" >
                                        {features.text}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>

                {/*leaser info*/}
                <Box sx={{ bgcolor: '#cfe8fc', mt: 2, borderRadius: '16px'}}>
                    <Typography variant="subtitle1" component="div" p={2} pb={1}>
                        Leaser Info / Contact
                    </Typography>
                    <Box sx={{ display: "flex", px:2 , alignItems: 'center'}}>
                        <Avatar alt="Tony Song" src="/static/images/avatar/2.jpg" />
                        <Typography variant="body" component="div" p={2} sx={{flexGrow: 1}}>
                            Tony Song
                        </Typography>
                        <Typography variant="body" component="div" p={2}>
                            Phone: 6783087638
                        </Typography>
                    </Box>
                </Box>

                <Box height={350}>
                    <Typography variant="h6" component="div" p={1}>
                        Map
                    </Typography>
                    <Map leaseData={[]}/>
                </Box>
                <Box height={100}>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default SubleaseInfo;

