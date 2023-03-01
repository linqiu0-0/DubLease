import React, {useEffect} from "react";
import {Box, Button, Container, Skeleton, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import Map from "../../components/Map";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";

export default function SubleaseInfoSkeleton() {
    const navigate = useNavigate();
    const rentalFeatures = [...Array(11).keys()];

    return (
        <Container fixed>
            <Button
                sx={{mt: 2, p: 0, px: 1}}
                size="medium"
                color="secondary"
                variant="contained"
                onClick={() => {
                    navigate(-1);
                }}
            >
                <ArrowBackIcon />
                <Typography variant="button" component="span" p={1}>
                    Back Home
                </Typography>
            </Button>

            <Typography variant="h2" component="h1">
                <Skeleton width={"30%"}/>
            </Typography>
            <Typography variant="h5" component="div">
                <Skeleton width={"20%"}/>
            </Typography>

            <Box marginTop={2} sx={{height: 550 }}>
                <Skeleton variant="rectangular" height={550}/>
            </Box>
            <Typography variant="h6" component="div" p={1}>
                Description
            </Typography>
            <Skeleton variant="rounded" height={200} sx={{p: 1}}/>

            <Typography variant="h6" component="div" p={1}>
                Rental Features
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={3} mx={1}>
                {
                    rentalFeatures.map((holder, index) => (
                        <Grid key={index} item xs={6}>
                            <Skeleton variant="rectangular" height={30}/>
                            {/*<Box sx={{display: 'flex', justifyContent: 'space-between'}}>*/}
                            {/*    <Typography align="left" variant="body" component="div">*/}
                            {/*        {features.label}*/}
                            {/*    </Typography>*/}
                            {/*    <Typography align="right" variant="body" component="div" >*/}
                            {/*        {features.text}*/}
                            {/*    </Typography>*/}
                            {/*</Box>*/}
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
                    <Skeleton variant="circular">
                        <Avatar/>
                    </Skeleton>
                    <Grid container justifyContent="space-between" sx={{flexGrow: 1}}>
                        <Grid xs={3}>
                            <Skeleton variant="rounded" sx={{m: 2}}/>
                        </Grid>
                        <Grid xs={3}>
                            <Skeleton variant="rounded" sx={{m: 2}}/>
                        </Grid>
                        <Grid xs={3}>
                            <Skeleton variant="rounded" sx={{m: 2, textAlign: 'right'}}/>
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
    );
}