import { CheckCircleOutline } from '@mui/icons-material';
import {Box, ImageListItem, ListItem, ListItemText, Paper} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import "../../styles/App.css";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";

const ImagePreview = ({ file, onClick}) => {
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let result = null;

        reader.onload = () => {
            //console.log(reader.result); //base64encoded string
            result = reader.result;
            console.log({
                imgName: file.name,
                body: result,
                format: "base64"
            })
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
        setImageURL(URL.createObjectURL(file));
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

