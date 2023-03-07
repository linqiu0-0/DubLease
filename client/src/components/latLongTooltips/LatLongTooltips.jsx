import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton } from '@mui/material';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 450,
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #dadde9',
    },
}));

function LatLongTooltips() {
    return (
        <div>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit">
                            Where to find latitude and longitude?
                        </Typography>
                        <p>We recommend to follow the tutorial in <b>Get the coordinate of your place</b> section provided by
                            <a 
                            className='text-sky-600 underline decoration-sky-600/30'
                            href="https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop&oco=1/" 
                            target="_blank" 
                            rel="noopener noreferrer">
                                {" Google Map"}
                            </a>.
                        </p>
                    </React.Fragment>
                }
            >
                <IconButton>
                    <HelpOutlineIcon fontSize='small' />
                </IconButton>
            </HtmlTooltip>
        </div>
    );
}

export { LatLongTooltips }