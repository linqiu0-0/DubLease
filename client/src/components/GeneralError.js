import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function GeneralError( {errorMessage, onClose} ) {

    return (
        <Snackbar open={errorMessage !== ""} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
}