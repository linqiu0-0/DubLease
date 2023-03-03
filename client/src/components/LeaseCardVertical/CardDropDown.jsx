import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { ArchiveDialogSlide } from './ArchiveDialogSlide';
import { DeleteDialogSlide } from './DeleteDialogSlide';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArchiveIcon from '@mui/icons-material/Archive';
import PropTypes from 'prop-types';


function CardDropDown({ post_id, lease_status, setReloading }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openArchive, setOpenArchive] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    

    const handleViewListings = () => {
        navigate("/sublease/" + post_id, {
            state: {
                post_id: post_id,
                username: window.sessionStorage.getItem("username")
            }
        });
    };


    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Manage Properties">
                    <IconButton
                        onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleViewListings}>
                    <ListItemIcon>
                        <HolidayVillageIcon fontSize="small" />
                    </ListItemIcon>
                    View Listing
                </MenuItem>
                <MenuItem onClick={handleViewListings}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Edit Listing
                </MenuItem>
                <Divider />
                <MenuItem onClick={()=> setOpenArchive(true)}>
                    <ListItemIcon >
                        <ArchiveIcon fontSize="small" />
                    </ListItemIcon>
                    {lease_status? "Archive Listing" :"Unarchive Listing"}
                </MenuItem>
                <MenuItem onClick={()=> {setOpenDelete(true)}} >
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    Delete Listing
                </MenuItem>
            </Menu>
            <ArchiveDialogSlide openArchive={openArchive} setOpenArchive={setOpenArchive} post_id={post_id} lease_status={lease_status} setReloading={setReloading} />
            <DeleteDialogSlide openDelete={openDelete} setOpenDelete={setOpenDelete} post_id={post_id} setReloading={setReloading}/>
        </React.Fragment>
    );
}

export { CardDropDown }

CardDropDown.propTypes = {
    post_id: PropTypes.number,
    lease_status: PropTypes.number,
    setReloading: PropTypes.func,
};