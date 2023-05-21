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
import UserContext from '../UserContext';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
    const [errorMessage, setErrorMessage] = React.useState('Kindly enter something in both fields before submitting.');
    const [showSignupSnackbar, setShowSignupSnackbar] = React.useState(false);
    const [showPasswordResetSnackbar, setShowPasswordResetSnackbar] = React.useState(false);
    const [invalidFormSubmission, setInvalidFormSubmission] = React.useState(false);

    const navigate = useNavigate();


    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const userContext = React.useContext(UserContext);

    const postData = async (data) => {
        // New function for subscribing user to push notifications
        const subscribeUser = (user) => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(function (registration) {
                    if (!registration.pushManager) {
                        console.log('Push Manager not available.');
                        return;
                    }

                    registration.pushManager.subscribe({
                        userVisibleOnly: true, // Always show notifications
                        applicationServerKey: 'BGuZgk5YaBkbYqc8J5YU0M_BqiAtBRozdgPU1zyNlrdIkWHsrEhNxf3ZYG2XqUlC5kMRq3uv0LdA-Iznb_aD_F0' // Replace with your VAPID public key
                    })
                        .then(function (subscription) {
                            // Send subscription to server
                            fetch('/api/subscribe', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    userId: user.id,
                                    subscription: subscription
                                })
                            });
                        })
                        .catch(function (error) {
                            console.error('Failed to subscribe user: ', error);
                        })

                })
            }
        }
        try {
            const response = await axios.post('/api/login', data, config);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('jwt', token);
                userContext.setUser({ ...user });
                subscribeUser(user);
                navigate('/projects');
            } else {
                setErrorMessage('Invalid email or password. Please try again.');
                setInvalidFormSubmission(true); // Add this line
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
            setInvalidFormSubmission(true); // Add this line
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // validate form and submit data

        if (!email || !password) {
            setInvalidFormSubmission(true);
            return; // Exit early if the form is invalid
        }

        const formData = JSON.stringify({
            email,
            password,
        });
        // send formData as a JSON to the backend
        postData(formData);
    };


    const handleSignupAlert = (event) => {
        event.preventDefault();
        setShowSignupSnackbar(true);
    };

    const handlePasswordResetAlert = (event) => {
        event.preventDefault();
        setShowPasswordResetSnackbar(true);
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
                        <Box component="form" noValidate onSubmit={(event) => event.preventDefault()} sx={{ mt: 1 }}>
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
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontSize: 14 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container marginTop={1}>
                                <Grid item xs>
                                    <Link href="#" variant="inherit" onClick={handlePasswordResetAlert}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item xs>
                                    <Link href="signup" variant="inherit" onClick={handleSignupAlert}>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                    <Snackbar
                        open={showPasswordResetSnackbar}
                        autoHideDuration={6000}
                        onClose={() => setShowPasswordResetSnackbar(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    >
                        <SnackbarContent
                            sx={{ backgroundColor: 'warning.main' }}
                            message="Only admins can reset your password for you. Kindly contact your admin if you have forgotten your password."
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setShowPasswordResetSnackbar(false)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        />
                    </Snackbar>

                    <Snackbar
                        open={showSignupSnackbar}
                        autoHideDuration={6000}
                        onClose={() => setShowSignupSnackbar(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    >
                        <SnackbarContent
                            sx={{ backgroundColor: 'warning.main' }}
                            message="Kindly contact your admin to have an account registered."
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setShowSignupSnackbar(false)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        />
                    </Snackbar>
                    <Snackbar
                        open={invalidFormSubmission}
                        autoHideDuration={6000}
                        onClose={() => {
                            setInvalidFormSubmission(false);
                            setErrorMessage(''); // Clear the error message when the Snackbar is closed
                        }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    >
                        <SnackbarContent
                            sx={{ backgroundColor: 'error.main' }}
                            message={errorMessage}
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setInvalidFormSubmission(false)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        />
                    </Snackbar>


                </Grid>
            </Grid>
        </ThemeProvider>
    );
}