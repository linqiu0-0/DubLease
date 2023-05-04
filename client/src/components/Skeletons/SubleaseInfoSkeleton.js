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
                <Skeleton animation="wave" width={"30%"}/>
            </Typography>
            <Typography variant="h5" component="div">
                <Skeleton animation="wave" width={"20%"}/>
            </Typography>

            <Box marginTop={2} sx={{height: 650 }}>
                <Skeleton animation="wave" variant="rectangular" height={650}/>
            </Box>
            <Typography variant="h6" component="div" p={1}>
                Description
            </Typography>
            <Skeleton animation="wave" variant="rounded" height={200} sx={{p: 1}}/>

            <Typography variant="h6" component="div" p={1}>
                Rental Features
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={3} mx={1}>
                {
                    rentalFeatures.map((holder, index) => (
                        <Grid key={index} item xs={6}>
                            <Skeleton animation="wave" variant="rectangular" height={30}/>
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
                    <Skeleton animation="wave" variant="circular">
                        <Avatar/>
                    </Skeleton>
                    <Grid container justifyContent="space-between" sx={{flexGrow: 1}}>
                        <Grid xs={3}>
                            <Skeleton animation="wave" variant="rounded" sx={{m: 2}}/>
                        </Grid>
                        <Grid xs={3}>
                            <Skeleton animation="wave" variant="rounded" sx={{m: 2}}/>
                        </Grid>
                        <Grid xs={3}>
                            <Skeleton animation="wave" variant="rounded" sx={{m: 2, textAlign: 'right'}}/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box height={350}>
                <Typography variant="h6" component="div" p={1}>
                    Map
                </Typography>
                <Map leaseData={[]} isSubleaseInfo={true}/>
            </Box>
            <Box height={100}>
            </Box>
        </Container>
    );
}