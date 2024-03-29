import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function ArchiveDialogSlide({ openArchive, setOpenArchive, post_id, lease_status, setReloading }) {

    function checkStatus(response) {
        if (!response.ok) {
            response.text().then(txt => { console.log(txt); });
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }



    const handleClose = () => {
        setOpenArchive(false);
    };

    const handleAgree = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                "lease_id": post_id,
                "status": !lease_status,
            })
        };
        fetch(process.env.REACT_APP_SERVER_URL + "archive_lease", requestOptions)
            .then(checkStatus)
            .then(() => {
                setReloading(true);
                setOpenArchive(false);
            })
            .catch((error) => { console.log(error) });
    }

    return (
        <div>
            <Dialog
                open={openArchive}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{lease_status ? "Archive this lisitng?" : "Unarchive this lisitng?"}</DialogTitle>

                {lease_status ?
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Archiving this listing will remove it from the search results, making it no longer
                            visible to potential renters. You can easily unarchive it later if needed.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-slide-description2">
                            We recommend to <b>delete</b> the listing once you have successfully subleased your property,
                            as this will prevent further inquiries and save you time.
                        </DialogContentText>
                    </DialogContent>
                    :
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            The listing  will then be restored and will become visible in search results again.
                        </DialogContentText>
                    </DialogContent>
                }

                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export { ArchiveDialogSlide }


ArchiveDialogSlide.propTypes = {
    openArchive: PropTypes.bool,
    setOpenArchive: PropTypes.func,
    post_id: PropTypes.number,
    lease_status: PropTypes.number,
    setReloading: PropTypes.func,
};