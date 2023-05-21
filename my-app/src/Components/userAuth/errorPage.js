import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigates one page back
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                bgcolor: 'background.default',
            }}
        >
            <Typography variant="h1" color="textPrimary" fontWeight="bold" mb={2}>
                404
            </Typography>
            <Typography variant="h4" color="textSecondary" mb={4}>
                Page Not Found
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={goBack}
                sx={{ width: '200px', px: 3, py: 1 }}
            >
                Go Back
            </Button>
        </Box>
    );
};

export default Error404;
