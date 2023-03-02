import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Divider, Paper, Skeleton, SvgIcon} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function LeaseCardSkeleton() {

    return (
        <Paper variant="outlined">
            <Grid container spacing={1}>
                <Grid xs={5}>
                    <Skeleton variant="rectangular" height={200} />
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
                        <Skeleton variant="subtitle1" />
                        <Skeleton variant="h5" />
                        <Skeleton variant="body2" />

                        <Divider />
                        <Skeleton variant="rounded" height={30}/>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}