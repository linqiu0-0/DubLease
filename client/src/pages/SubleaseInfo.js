import React, {useEffect} from "react";
import {Box, Button, Container, Typography} from '@mui/material';
import MainAppBar from "../components/AppBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams, useLocation} from "react-router-dom";
import Map from "../components/Map";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import ImagesCarousel from "../components/ImagesCarousel";
import SubleaseInfoSkeleton from "../components/Skeletons/SubleaseInfoSkeleton";
import GeneralError from "../components/GeneralError";
import ImagePlaceHolder from "../assets/images/PlaceHolderImage.png";

const SubleaseInfo = () => {
    const [subleaseInfoData, setSubleaseInfoData] = React.useState("");
    const [images, setImages] = React.useState([]);
    const [rentalFeatures, setRentalFeatures] = React.useState([]);
    const [mapData, setMapData] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");

    const navigate = useNavigate();
    const leaseId = useParams();
    const entryFrom = useLocation().state;

    const fetchImage = async (imageKey) => {
        let query = process.env.REACT_APP_SERVER_URL + "get_image?key=" + imageKey;
        try {
            let response = await fetch(query);
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                throw new Error(error);
            }
            let data = await response.json();
            let imageBytes = data.Body.data;
            imageBytes = _arrayBufferToBase64(imageBytes);
            let imageUrl = "data:image/png;base64," + imageBytes;
            images.push({ src: imageUrl }); // have to use push since multiple images may change state at the same time
        } catch (error) {
            console.error('There was an error!', error);
            throw new Error("Image " + error.message);
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
        let query = process.env.REACT_APP_SERVER_URL + "get_sublease?id=" + leaseId.id;
        try {
            let response = await fetch(query);
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                throw new Error(error);
            }

            const data = await response.json();

            if (data.image_keys.length == 0 ) {
                setImages([...images, { src: ImagePlaceHolder }]);
            } else {
                for (let i = 0; i < data.image_keys.length; i++) {
                    await fetchImage(data.image_keys[i]);
                }
            }
            data.user_phone = (data.user_phone === null || data.user_phone === "") ? "N/A": data.user_phone;
            setSubleaseInfoData(data);
            setRentalFeatures(data.rental_features);

            const category = data.rental_features.find(
                f => f.label === ("Category")
            )
            setMapData([{latitude: data.latitude, longitude: data.longitude, category: category.text}])
        } catch (error) {
            console.error('There was an error!', error);
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        fetchSublaseInfo();
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorMessage("");
    };

    return (
        <React.Fragment>
            <MainAppBar username={window.sessionStorage.getItem("username")}/>
            {
                subleaseInfoData === "" ?
                <SubleaseInfoSkeleton/>
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
                        {subleaseInfoData.name}
                    </Typography>
                    <Typography variant="subtitle1" component="div" py={1}>
                        {subleaseInfoData.address}
                    </Typography>

                    {/* Image Carousel */}
                    <Box sx={{height: 650}}>
                        <ImagesCarousel images={images}/>
                    </Box>

                    <Typography variant="h6" component="div" p={1}>
                        Description
                    </Typography>
                    <Typography variant="body" component="div" p={1}>
                        {subleaseInfoData.description}
                    </Typography>

                    {/* Rental Features */}
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

                    {/* leaser info / contact */}
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
            <GeneralError errorMessage={errorMessage} onClose={handleClose}/>
        </React.Fragment>
    );
};

export default SubleaseInfo;
