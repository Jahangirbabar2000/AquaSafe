import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Alert, AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import myImage from './water.jpg';
import UserContext from '../UserContext'

import nustlogo from "../../../nust.png";
import asiaconnectLogo from "../../../asiaconenct-logo.png";
import teinLogo from "../../../tein-logo.png";

function Copyright(props) {
    return (
        <Typography variant="h6" color="text.secondary" align="center" {...props}>
            {'Copyright © AsiaConnect '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
   

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const handleEmailValidation = (email) => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
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

    const config = {
        "headers": {
            "Content-Type": "application/json"
        }
    }
    
    const userContext = React.useContext(UserContext);
    const postData = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', data, config);
            console.log("Server response:", response.data); // Add this line
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('jwt', token);
                userContext.setUser({ ...user }); // Update the UserContext
                navigate('/projects');
            } else {
                // handle error response
                console.log('Error: ', response.status, response.data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage('Incorrect password. Please try again.');
                } else if (error.response.status === 404) {
                    setErrorMessage('User not found. Please check your email.');
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            } else {
                console.error('Error posting data: ', error);
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate form and submit data

        const formData = JSON.stringify({
            email,
            password
        });
        // send formData as a JSON to the backend  
        postData(formData);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${myImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 13, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 50, height: 50 }}>
                            <LockOutlinedIcon fontSize="medium" />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Sign in
                        </Typography>


                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            {errorMessage && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    <AlertTitle>Error</AlertTitle>
                                    {errorMessage}
                                </Alert>
                            )}
                            <TextField
                                margin="normal"
                                inputProps={{ style: { fontSize: 14 } }}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(event) => setEmail(event.target.value)}
                                onBlur={(event) => handleEmailValidation(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                inputProps={{ style: { fontSize: 14 } }}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setPassword(event.target.value)}
                                onBlur={(event) => handlePasswordValidation(event.target.value)}
                            />

                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontSize: 14 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container marginTop={1}>
                                <Grid item xs>
                                    <Link href="#" variant="inherit">
                                        {"Forgot password?"}
                                    </Link>
                                </Grid>
                                <Grid item xs>
                                    <Link href="signup" variant="inherit">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box style={{display: "flex", marginLeft:"1%", marginTop:40}}>
                            <img style={{height: 60 ,marginLeft: 0, marginTop:10}} src={asiaconnectLogo} alt="asiaconnect logo" />
                            <img style={{height: 60 ,marginLeft: 25}} src={teinLogo} alt="tein logo" />
                            <img style={{height: 70 ,marginLeft: 25,  marginTop:6}}src={nustlogo} alt="NUST logo" />
                        </Box>
                            <Copyright sx={{ mt: 1 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}