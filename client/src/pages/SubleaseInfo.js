import React from "react";
import {Box, Button, Container, Typography, Avatar} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams, useLocation} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {useQuery} from 'react-query';

import MainAppBar from "../components/AppBar";
import Map from "../components/Map";
import ImagesCarousel from "../components/ImagesCarousel";
import SubleaseInfoSkeleton from "../components/Skeletons/SubleaseInfoSkeleton";
import GeneralError from "../components/GeneralError";

const SubleaseInfo = () => {
    const [mapData, setMapData] = React.useState([]);

    const navigate = useNavigate();
    const leaseId = useParams();
    const entryFrom = useLocation().state;

    const fetchSublaseInfo = async (event) => {
        let query = process.env.REACT_APP_SERVER_URL + "get_sublease?id=" + leaseId.id;
        try {
            let response = await fetch(query);
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                throw new Error(error);
            }

            const data = await response.json();


            data.user_phone = (data.user_phone === null || data.user_phone === "") ? "N/A": data.user_phone;
            const category = data.rental_features.find(
                f => f.label === ("Category")
            )
            setMapData([{latitude: data.latitude, longitude: data.longitude, category: category.text}])
            return data;
        } catch (error) {
            console.error('There was an error!', error);
            throw new Error(error);
        }
    }

    const subleaseInfoData =
        useQuery(["subleaseInfo", leaseId],
            () => fetchSublaseInfo(),
{
            retry:false
        });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <React.Fragment>
            <MainAppBar username={window.sessionStorage.getItem("username")}/>
            {
                subleaseInfoData.isLoading ?
                <SubleaseInfoSkeleton/>
                :
                    subleaseInfoData.isError ?
                        <>
                            <SubleaseInfoSkeleton/>
                            <GeneralError errorMessage={subleaseInfoData.error.message} onClose={handleClose}/>
                        </>
                        :
                <Container fixed>

                    <Button
                        sx={{mt: 2, p: 0, px: 1}}
                        size="medium"
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            if (entryFrom !== null && entryFrom.entryFrom === "Listing") {
                                navigate("/listings");
                            } else {
                                navigate("/");
                            }
                        }}
                    >
                        <ArrowBackIcon />
                        <Typography variant="button" component="span" p={1}>
                            Back
                            {entryFrom !== null && entryFrom.entryFrom === "Listing" ? " Listing" : " Home"}
                        </Typography>
                    </Button>

                    <Typography variant="h4" component="h1" pb={1} pt={2}>
                        {subleaseInfoData.data.name}
                    </Typography>
                    <Typography variant="subtitle1" component="div" py={1}>
                        {subleaseInfoData.data.address}
                    </Typography>

                    {/* Image Carousel */}
                    <Box sx={{height: 650}}>
                        <ImagesCarousel image_keys={subleaseInfoData.data.image_keys}/>
                    </Box>

                    <Typography variant="h6" component="div" p={1}>
                        Description
                    </Typography>
                    <Typography variant="body" component="div" p={1}>
                        {subleaseInfoData.data.description}
                    </Typography>

                    {/* Rental Features */}
                    <Typography variant="h6" component="div" p={1}>
                        Rental Features
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3} mx={1}>
                        {
                            (subleaseInfoData.data.rental_features).map((features) => (
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

                    {/* leaser info / contact */}
                    <Box sx={{ bgcolor: '#cfe8fc', mt: 2, borderRadius: '16px'}}>
                        <Typography variant="subtitle1" component="div" p={2} pb={1}>
                            Leaser Info / Contact
                        </Typography>

                        <Box sx={{ display: "flex", px:2 , alignItems: 'center'}}>
                            <Avatar alt={subleaseInfoData.data.username} src="/static/images/avatar/2.jpg" />
                            <Grid container justifyContent="space-between" sx={{flexGrow: 1}}>
                                <Grid xs={3}>
                                    <Typography variant="body" component="div" p={2}>
                                        {subleaseInfoData.data.username}
                                    </Typography>
                                </Grid>
                                <Grid xs={3}>
                                    <Typography variant="body" component="div" p={2}>
                                        Email: {subleaseInfoData.data.user_email}
                                    </Typography>
                                </Grid>
                                <Grid xs={3}>
                                    <Typography variant="body" component="div" p={2} sx={{ textAlign: 'right' }}>
                                        Phone: {subleaseInfoData.data.user_phone}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    {/* Map View */}
                    <Box height={350}>
                        <Typography variant="h6" component="div" p={1}>
                            Map
                        </Typography>
                        <Map leaseData={mapData} isSubleaseInfo={true}/>
                    </Box>

                    {/* Bottom Margin*/}
                    <Box height={100}>
                    </Box>
                </Container>
            }
        </React.Fragment>
    );
};

export default SubleaseInfo;
