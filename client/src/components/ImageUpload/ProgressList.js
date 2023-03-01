import {Stack} from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem';

const ProgressList = ({ files }) => {
    return (
    <Stack spacing={2}>
        {files.map((file, index) => (
            <ProgressItem file={file} key={index} />
        ))}
    </Stack>
    );
};

export default ProgressList;