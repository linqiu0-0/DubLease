import { CheckCircleOutline } from '@mui/icons-material';
import {Box, ImageListItem, ListItem, ListItemText, Paper} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {styled} from "@mui/material/styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProgressItem = ({ file }) => {
    const [progress, setProgress] = useState(50);
    const [imageName, setImageName] = useState(null);

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
        // setImageURL(URL.createObjectURL(file));
        setImageName(file.name);
    }, [file]);

    return (
        imageName && (
            <Box>
                {imageName}
                <CheckCircleIcon color="success"/>
            </Box>
        )
    );
};

export default ProgressItem;