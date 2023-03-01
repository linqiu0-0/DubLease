import { useState } from 'react';
import { Add } from '@mui/icons-material';
import {Button, Input} from '@mui/material';
import { useRef } from 'react';
import Box from "@mui/material/Box";
import ProgressList from "./ProgressList";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const Upload = () => {
    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        setFiles([...e.target.files]);
    };

    return (
        <Box>
            <Button variant="contained" component="label" startIcon={<AddAPhotoIcon />}>
                Upload Images
                <input hidden accept="image/*" multiple type="file" onChange={handleChange} />
            </Button>

            <ProgressList files={files} />
        </Box>
    );
};

export default Upload;