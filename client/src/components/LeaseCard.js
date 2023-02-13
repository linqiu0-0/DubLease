import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Divider, Paper, SvgIcon} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactComponent as BedIcon } from '../assets/images/BedIcon.svg';
import { ReactComponent as SizeIcon } from '../assets/images/SizeIcon.svg';
import { ReactComponent as BathIcon } from '../assets/images/BathIcon.svg';
import "../styles/App.css"


function LeaseCard({ leaseCardData }) {
    return (
        <Paper variant="outlined">
            <Grid container spacing={1}>
                <Grid xs={5}>
                    <img
                        src={leaseCardData.coverImg.src}
                        alt={leaseCardData.coverImg.alt}
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
                                    {leaseCardData.space}
                                </Typography>
                            </Box>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default LeaseCard;