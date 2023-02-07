import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../navbar/navbar.js";
import Sidebar from "../sidebar/side-bar.js";
import MenuItem from '@mui/material/MenuItem';

function Copyright(props) {
    return (
        <Typography variant="h5" color="text.secondary" align="center" {...props}>
            {'Copyright © AsiaConnect '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const designations = [
        {
            value: 'IoT Engineer',
            label: 'IoT Engineer',
        },
        {
            value: 'Local Admin',
            label: 'Local Admin',
        },
        {
            value: 'Government Admin',
            label: 'Government Admin',
        },
    ];

    const countries = [
        {
            value: 'China',
            label: 'China',
        },
        {
            value: 'Pakistan',
            label: 'Pakistan',
        },
        {
            value: 'Turkey',
            label: 'Turkey',
        },
        {
            value: 'Iran',
            label: 'Iran',
        },
    ];

    const sites = [
        {
            value: 'Rawal Dam',
            label: 'Rawal Dam',
        },
        {
            value: 'Tarbela Dam',
            label: 'Tarbela Dam',
        },
        {
            value: 'Mangla Dam',
            label: 'Mangla Dam',
        },
    ];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [country, setCountry] = useState('');
    const [site, setSite] = useState('');

    const handleEmailValidation = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            // alert("Please enter a valid email address.");
        }
    };

    const handlePasswordValidation = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            // alert("Please enter a valid password. It should be more than 7 characters long and include at least one uppercase character and one special character.");
        }
    };

    const handleConfirmPasswordValidation = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            //   alert("Passwords do not match. Please try again.");
        }
    };

    const config = {
        "headers": {
            "Content-Type": "application/json"
        }
    }
    const postData = async (data) => { await axios.post('http://localhost:8080/signup', data, config); }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate form and submit data

        const formData = JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            designation,
            country,
            site
        });
        // send formData as a JSON to the backend  
        postData(formData);
    };

    return (
        <div>
            <Navbar />
            <Sidebar />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    {/* <CssBaseline /> */}
                    <Box
                        sx={{
                            marginLeft: 5,
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 55, height: 55 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Create a new user
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        inputProps={{ style: { fontSize: 16 } }}
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        inputProps={{ style: { fontSize: 16 } }}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        inputProps={{ style: { fontSize: 16 } }}
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(event) => setEmail(event.target.value)}
                                        onBlur={(event) => handleEmailValidation(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        inputProps={{ style: { fontSize: 16 } }}
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(event) => setPassword(event.target.value)}
                                        onBlur={(event) => handlePasswordValidation(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="designation"
                                        fullWidth
                                        select
                                        name="designation"
                                        label="designation"
                                        type="designation"
                                        onChange={(event) => setDesignation(event.target.value)}
                                    >
                                        {designations.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="country"
                                        fullWidth
                                        select
                                        name="country"
                                        label="country"
                                        type="country"
                                        onChange={(event) => setCountry(event.target.value)}
                                    >
                                        {countries.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="site"
                                        fullWidth
                                        select
                                        name="site"
                                        label="site"
                                        type="site"
                                        onChange={(event) => setSite(event.target.value)}
                                    >
                                        {sites.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 5, mb: 2, fontSize: 13 }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                    <Copyright justif sx={{ mt: 2, ml: 5 }} />

                </Container>
            </ThemeProvider>
        </div>

    );
}