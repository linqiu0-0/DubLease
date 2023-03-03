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


function DeleteDialogSlide({ openDelete, setOpenDelete, post_id }) {

    function checkStatus(response) {
        if (!response.ok) {
            response.text().then(txt => { console.log(txt); });
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleAgree = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "lease_id": post_id
            })
        };
        fetch(process.env.REACT_APP_SERVER_URL + "delete_lease", requestOptions)
            .then(checkStatus)
            .then(() => { setOpenDelete(false); })
            .catch((error) => { console.log(error) });
    }

    return (
        <div>
            <Dialog
                open={openDelete}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Delete this lisitng?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Once a listing is deleted, it cannot be recovered, and all associated information, including photos and
                        inquiries, will be permanently removed from our system. We only recommend you to delete this listing when
                        you have successfully subleased it.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export { DeleteDialogSlide }

DeleteDialogSlide.propTypes = {
    openDelete: PropTypes.bool,
    setOpenDelete: PropTypes.func,
    post_id: PropTypes.number,
};

