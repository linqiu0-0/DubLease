import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Divider, Paper, Skeleton, SvgIcon} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactComponent as BedIcon } from '../assets/images/BedIcon.svg';
import { ReactComponent as SizeIcon } from '../assets/images/SizeIcon.svg';
import { ReactComponent as BathIcon } from '../assets/images/BathIcon.svg';
import "../styles/App.css"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import LeaseCardSkeleton from "./Skeletons/LeaseCardSkeleton";
import ImagePlaceHolder from "../assets/images/PlaceHolderImage.png";


function LeaseCard({ leaseCardData, errorDisplay }) {
    const [image, setImage] = React.useState("");

    const navigate = useNavigate();

    const browseSubleaseDetail = (event) => {
        navigate("/sublease/" + leaseCardData.post_id, {
            state: {
                entryFrom: "Home",
            }
        });
    }
    const fetchImage = async (imageKey) => {

        if (imageKey == null) {
            setImage(ImagePlaceHolder);
            return;
        }
        try {
            let response = await fetch(process.env.REACT_APP_SERVER_URL + "get_image?key=" + imageKey);
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                throw new Error(error);
            }
            let data = await response.json();
            let imageBytes = data.Body.data;
            imageBytes = _arrayBufferToBase64(imageBytes);
            let imageUrl = "data:image/png;base64," + imageBytes;
            setImage(imageUrl);
        } catch (error) {
            console.error(error);
            errorDisplay(error.message);
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

    useEffect(() => {
        fetchImage(leaseCardData.image_keys[0]);
    }, []);

    return (
        (image === "") ?
            ( <LeaseCardSkeleton /> )
            :
            ( <Paper variant="outlined" onClick={browseSubleaseDetail}>
                <Grid container spacing={1}>
                    <Grid xs={5}>
                        <img
                            src={image}
                            alt={leaseCardData.name + " cover image"}
                            className="img"
                        />
                    </Grid>
                    <Grid xs={7}>
                        <Box
                            sx={{
                                display: "flex",
                                // alignItems: "center",
                                justifyContent: "space-evenly",
                                flexDirection: "column",
                                height: "100%",
                                px: 2
                            }}
                        >
                            <Typography variant="subtitle1" component="h2">
                                ${leaseCardData.price} / month
                            </Typography>
                            <Typography variant="h5" component="h2" marginTop={0}>
                                {leaseCardData.name}
                            </Typography>
                            <Typography variant="body2" component="span" marginTop={0}>
                                {leaseCardData.address}
                            </Typography>
                            <Divider />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "flex-start",
                            }}>
                                <Box mx={2}>
                                    <SvgIcon component="span" fontSize="small" sx={{ pt:1 }}>
                                        <BedIcon />
                                    </SvgIcon>
                                    <Typography variant="body1" component="span" marginTop={0} mx={1}>
                                        {leaseCardData.bedNum}
                                    </Typography>
                                </Box>
                                <Box mx={2}>
                                    <SvgIcon component="span" fontSize="small" sx={{ pt:1 }}>
                                        <BathIcon />
                                    </SvgIcon>
                                    <Typography paragraph variant="body1" component="span" marginTop={0} mx={1}>
                                        {leaseCardData.bathNum}
                                    </Typography>
                                </Box>

                                <Box mx={2}>
                                    <SvgIcon component="span" fontSize="small" sx={{ pt:1 }}>
                                        <SizeIcon />
                                    </SvgIcon>
                                    <Typography variant="body1" component="span" marginTop={0} mx={1}>
                                        {leaseCardData.space} sqft
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper> )
    );
}

export default LeaseCard;