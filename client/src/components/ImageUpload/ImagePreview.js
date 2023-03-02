import { CheckCircleOutline } from '@mui/icons-material';
import {Box, ImageListItem, ListItem, ListItemText, Paper} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import "../../styles/App.css";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";

const ImagePreview = ({ file, onClick, getFileData}) => {
    const [imageURL, setImageURL] = useState(null);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e) => {
        const base64 = await convertToBase64(file);
        console.log(base64.indexOf("data:image\/\w+;base64,"));
        let fileData = {
            name: file.name,
            encoding: "base64",
            type: "image/png",
            data: base64,
        };
        console.log(fileData);
        getFileData(fileData);
        setImageURL(URL.createObjectURL(file));
    };


    useEffect(() => {
        handleFileUpload();
    }, [file]);

    return (
        imageURL && (
            <Grid xs={4}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative"
                }}>
                    <IconButton aria-label="delete" size="small" sx={{position: "absolute", top: 0, right: 0}} onClick={onClick}>
                        <CancelIcon fontSize="inherit"/>
                    </IconButton>
                    <img src={imageURL} alt="images gallery" loading="lazy" className={"upload_img"} />
                </Box>
            </Grid>
        )
    );
};

export default ImagePreview;

