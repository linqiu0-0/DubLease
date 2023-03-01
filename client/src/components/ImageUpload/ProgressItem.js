import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';

const ProgressItem = ({ file }) => {
    const [progress, setProgress] = useState(50);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            console.log(reader.result); //base64encoded string
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
        setImageURL(URL.createObjectURL(file));
    }, [file]);


    return (
        imageURL && (
            <ImageListItem cols={1} rows={1}>
                <img src={imageURL} alt="images gallery" loading="lazy" />
                <Box sx={backDrop}>
                    {progress < 100 ? (
                        <CircularProgressWithLabel value={progress} />
                    ) : (
                        <CheckCircleOutline
                            sx={{ width: 60, height: 60, color: 'lightgreen' }}
                        />
                    )}
                </Box>
            </ImageListItem>
        )
    );
};

export default ProgressItem;

const backDrop = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,.5)',
};