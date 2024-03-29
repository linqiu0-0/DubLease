import * as React from 'react';
import { Box, Divider, Paper, SvgIcon, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactComponent as BedIcon } from '../assets/images/BedIcon.svg';
import { ReactComponent as SizeIcon } from '../assets/images/SizeIcon.svg';
import { ReactComponent as BathIcon } from '../assets/images/BathIcon.svg';
import "../styles/App.css"
import { useNavigate } from "react-router-dom";
import LeaseCardSkeleton from "./Skeletons/LeaseCardSkeleton";
import ImagePlaceHolder from "../assets/images/PlaceHolderImage.png";
import {useQuery} from 'react-query';


function LeaseCard({ leaseCardData, errorDisplay }) {

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
            return ImagePlaceHolder;
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
            let blob = new Blob([new Uint8Array(imageBytes)],{type:'image/png'});
            let file = new File([blob],imageKey);
            let imageUrl = URL.createObjectURL(file);
            return imageUrl;
        } catch (error) {
            console.error(error);
            errorDisplay(error.message);
        }
        return null;
    };

    const { isLoading, isError, data, error } =
        useQuery(["subleaseImage", leaseCardData.image_keys[0]],
            () => fetchImage(leaseCardData.image_keys[0]));

    return (
        (isLoading) ?
            (<LeaseCardSkeleton />)
            :
            (<Paper variant="outlined" onClick={browseSubleaseDetail}>
                <Grid container spacing={1}>

                    {/* Cover Image*/}
                    <Grid xs={5}>
                        <img
                            src={data}
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
                            <div>
                                <Typography fontWeight='bold' className="text-deep_purple_A200" variant="h5" component="span">
                                   ${leaseCardData.price} 
                                </Typography>
                                <Typography className='text-slate-600' variant="body1" component="span">
                                    {" "}/month
                                </Typography>
                            </div>
                            <Typography fontWeight='bold' className='text-gray-700 ' variant="h5" component="h2" marginTop={0}>
                                {leaseCardData.name}
                            </Typography>
                            <Typography className='text-slate-600' variant="body2" component="span" marginTop={0}>
                                {leaseCardData.address}
                            </Typography>
                            <Divider />

                            {/* Detail and icon display */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "flex-start",
                            }}>
                                <Box mx={2}>
                                    <SvgIcon component="span" fontSize="small" sx={{ pt: 1 }}>
                                        <BedIcon />
                                    </SvgIcon>
                                    <Typography className='text-slate-600' variant="body2" component="span" marginTop={0} mx={0}>
                                        {
                                            leaseCardData.bedNum === "0" ?
                                                "Studio" :
                                                leaseCardData.bedNum === "1" ? leaseCardData.bedNum + " Bed" :
                                                    leaseCardData.bedNum + " Beds"}
                                    </Typography>
                                </Box>
                                <Box mx={2}>
                                    <SvgIcon component="span" fontSize="small" sx={{ pt: 1 }}>
                                        <BathIcon />
                                    </SvgIcon>
                                    <Typography className='text-slate-600' paragraph variant="body2" component="span" marginTop={0} mx={0}>
                                        {leaseCardData.bathNum} {leaseCardData.bathNum === "1" ? "Bath" : "Baths"}
                                    </Typography>
                                </Box>

                                <Box mx={2}>
                                    <SvgIcon component="span" fontSize="small" sx={{ pt: 1 }}>
                                        <SizeIcon />
                                    </SvgIcon>
                                    <Typography className='text-slate-600' variant="body2" component="span" marginTop={0} mx={0}>
                                        {leaseCardData.space} sqft
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>)
    );
}

export default LeaseCard;