import React, {useEffect} from "react";
import {Box, Button, Container, Divider, Paper, Typography} from '@mui/material';
import MainAppBar from "../components/AppBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useLocation, useNavigate} from "react-router-dom";
import Map from "../components/Map";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import ImagesCarousel from "../components/ImagesCarousel";

const SubleaseInfo = () => {
    const [subleaseInfoData, setSubleaseInfoData] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [rentalFeatures, setRentalFeatures] = React.useState([]);

    const navigate = useNavigate();
    const subleaseInfoMeta = useLocation();

    const headers = { 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"};

    const fetchImage = async (imageKey) => {
        try {
            let response = await fetch(process.env.REACT_APP_SERVER_URL + "get_image?key=" + imageKey,
                {headers})
            let data = await response.json();
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            let imageBytes = data.Body.data;
            imageBytes = _arrayBufferToBase64(imageBytes);
            let imageUrl = "data:image/png;base64," + imageBytes;
            images.push({ src: imageUrl });
            console.log(images);
        } catch (e) {
            console.log(e);
        }
    };

    const _arrayBufferToBase64=(buffer) => {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    const fetchSublaseInfo = async (event) => {
        let url = process.env.REACT_APP_SERVER_URL + "get_sublease?id=" + subleaseInfoMeta.state.post_id;
        console.log(url);

        fetch(url,
            {headers})
            .then(async response => {
                const data = await response.json();
                console.log(data);
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                for (let i = 0; i < data.image_keys.length; i++) {
                    await fetchImage(data.image_keys[i]);
                }
                data.user_phone = (data.user_phone === null || data.user_phone === "") ? "N/A": data.user_phone;
                setSubleaseInfoData(data);
                setRentalFeatures(data.rental_features);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        fetchSublaseInfo();
    }, []);

    return (
        <React.Fragment>
            <MainAppBar username={subleaseInfoMeta.state.username}/>
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
                    {subleaseInfoData.name}
                </Typography>
                <Typography variant="subtitle1" component="div" p={1}>
                    {subleaseInfoData.address}
                </Typography>
                <Box marginTop={2} sx={{height: 550 }}>
                    <ImagesCarousel images={images}/>
                </Box>
                <Typography variant="h6" component="div" p={1}>
                    Description
                </Typography>
                <Typography variant="body" component="div" p={1}>
                    {subleaseInfoData.description}
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
                        <Avatar alt={subleaseInfoData.username} src="/static/images/avatar/2.jpg" />
                        <Grid container justifyContent="space-between" sx={{flexGrow: 1}}>
                            <Grid xs={3}>
                                <Typography variant="body" component="div" p={2}>
                                    {subleaseInfoData.username}
                                </Typography>
                            </Grid>
                            <Grid xs={3}>
                                <Typography variant="body" component="div" p={2}>
                                    Email: {subleaseInfoData.user_email}
                                </Typography>
                            </Grid>
                            <Grid xs={3}>
                                <Typography variant="body" component="div" p={2} sx={{ textAlign: 'right' }}>
                                    Phone: {subleaseInfoData.user_phone}
                                </Typography>
                            </Grid>
                        </Grid>
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

