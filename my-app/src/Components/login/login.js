import * as React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
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

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

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

    const config = {
        "headers": {
            "Content-Type": "application/json"
        }
    }
    const postData = async (data) => { await axios.post('http://localhost:8080/signin', data, config); }

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
                            my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 3, bgcolor: 'primary.main', width: 50, height: 50 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h3">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

                            <Link href="/dashboard">
                                <Button
                                    // type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 12 }}
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Grid container marginTop={1}>
                                <Grid item xs>
                                    <Link href="#" variant="h6">
                                        {"Forgot password?"}
                                    </Link>
                                </Grid>
                                <Grid item xs>
                                    <Link href="signup" variant="h6">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}