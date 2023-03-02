import React, { useState } from 'react';
import {Button} from '@mui/material';
import Box from "@mui/material/Box";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Grid from "@mui/material/Unstable_Grid2";
import ImagePreview from "./ImagePreview";

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [filesData, setFilesData] = useState([]);

    const handleChange = (e) => {
        let newFiles = [...e.target.files];
        setFiles([...files, ...newFiles]);
        setFilesData([...filesData, {}]);
    };
    const handleClick = (index) => (e) => {
        setFiles(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
        setFilesData(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
    };

    const getFileData = (index) => (fileData) => {
        filesData[index] = fileData;
    }

    return (
        <Box>
            <Button variant="contained" component="label" startIcon={<AddAPhotoIcon />}>
                Upload Images
                <input hidden accept="image/*" multiple type="file" onChange={handleChange} />
            </Button>

            <Grid container spacing={2} sx={{width: 400}}>
                {files.map((file, index) => (
                    <ImagePreview file={file} key={index} onClick={handleClick(index)} getFileData={getFileData(index)}/>
                ))}
            </Grid>
        </Box>
    );
};

export default Upload;