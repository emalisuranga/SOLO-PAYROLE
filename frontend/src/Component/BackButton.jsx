import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
        </IconButton>
    );
};

export default BackButton;
