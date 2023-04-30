import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

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
                onClick={() => navigate('/')}
                sx={{ width: '200px', px: 3, py: 1 }}
            >
                Go to Home
            </Button>
        </Box>
    );
};

export default Error404;
