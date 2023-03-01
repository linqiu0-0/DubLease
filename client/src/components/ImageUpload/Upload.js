import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Fab, Input } from '@mui/material';
import { useRef } from 'react';
import Box from "@mui/material/Box";
import ProgressList from "./ProgressList";

const Upload = () => {
    const [files, setFiles] = useState([]);
    const fileRef = useRef();
    const handleClick = () => {
        fileRef.current.click();
    };
    const handleChange = (e) => {
        setFiles([...e.target.files]);
        fileRef.current.value = null;
    };

    return (
        <Box>
            <form>
                <Input
                    type="file"
                    inputProps={{ multiple: true }}
                    sx={{ display: 'none' }}
                    inputRef={fileRef}
                    onChange={handleChange}
                />
                <Fab color="primary" aria-label="add" onClick={handleClick}>
                    <Add fontSize="large" />
                </Fab>
            </form>

            <ProgressList files={files} />
        </Box>
    );
};

export default Upload;