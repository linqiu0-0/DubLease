import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Divider, Paper, SvgIcon} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactComponent as BedIcon } from '../images/BedIcon.svg';
import { ReactComponent as SizeIcon } from '../images/SizeIcon.svg';
import { ReactComponent as BathIcon } from '../images/BathIcon.svg';
import "../styles/App.css"


function LeaseCard({ LeaseCardData }) {
    return (
        <Paper>
            <Grid container spacing={1}>
                <Grid xs={5}>
                    <img
                        src={LeaseCardData.coverImg.src}
                        alt={LeaseCardData.coverImg.alt}
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
                            ${LeaseCardData.price} / month
                        </Typography>
                        <Typography variant="h5" component="h2" marginTop={0}>
                            {LeaseCardData.name}
                        </Typography>
                        <Typography variant="body2" component="span" marginTop={0}>
                            {LeaseCardData.address}
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
                                    {LeaseCardData.bedNum}
                                </Typography>
                            </Box>
                            <Box mx={2}>
                                <SvgIcon component="span" fontSize="small" sx={{ pt:1 }}>
                                    <BathIcon />
                                </SvgIcon>
                                <Typography paragraph variant="body1" component="span" marginTop={0} mx={1}>
                                    {LeaseCardData.bathNum}
                                </Typography>
                            </Box>

                            <Box mx={2}>
                                <SvgIcon component="span" fontSize="small" sx={{ pt:1 }}>
                                    <SizeIcon />
                                </SvgIcon>
                                <Typography variant="body1" component="span" marginTop={0} mx={1}>
                                    {LeaseCardData.space}
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