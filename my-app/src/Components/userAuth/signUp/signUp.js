import React, { useState, useEffect } from 'react';
import { projectsAPI, authAPI } from '../../../services/api';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../navbar/navbar.js";
import MenuItem from '@mui/material/MenuItem';
import Sidebar2 from "../../sidebar/Sidebar2.js";
import { useNavigate } from 'react-router-dom';

// function Copyright(props) {
//     return (
//         <Typography variant="h6" color="text.secondary" align="center" {...props}>
//             {'Copyright © AsiaConnect '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const theme = createTheme();

export default function SignUp() {

    const [projectList, setProjectList] = useState([]);
    const [site, setSite] = useState('');
    const [uniqueSites, setUniqueSites] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectsAPI.getAll();
                setProjectList(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const filteredSites = projectList
            .filter((project) => project.Country === country)
            .map((project) => project.Name);
        setUniqueSites(filteredSites);
    }, [country, projectList]);

    const uniqueCountries = [...new Set(projectList.map((option) => option.Country))];

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

    const navigate = useNavigate();
    const postData = async (data) => {
        try {
            await authAPI.register(JSON.parse(data));
            alert('User registered successfully! You can now log in.');
            navigate('/login');
        } catch (error) {
            console.error('Error submitting form:', error);
            const message = error.response?.data?.message || 'Error registering user. Please try again.';
            alert(message);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // validate form and submit data

        const formData = JSON.stringify({
            firstName,
            lastName,
            email,
            password,
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
            <Sidebar2 name="Users" />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md">
                    <Box sx={{
                        marginLeft: { xs: 0, sm: '80px', md: '250px' },
                        marginTop: { xs: 2, sm: 4 },
                        marginRight: { xs: 1, sm: 2 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: '7px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                        padding: { xs: 2, sm: '5vh' },
                        paddingBottom: { xs: 2, sm: 1 },
                        width: { xs: '100%', sm: 'auto' },
                        maxWidth: '100%'
                    }}>
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
                                        label="Designation (Optional)"
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
                                        label="Country (Optional)"
                                        type="country"
                                        onChange={(event) => setCountry(event.target.value)}
                                    >
                                        {uniqueCountries.map((country) => (
                                            <MenuItem key={country} value={country}>
                                                {country}
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
                                        label="Site/Project (Optional)"
                                        type="site"
                                        value={site}
                                        onChange={(event) => setSite(event.target.value)}
                                        disabled={!country}
                                    >
                                        {uniqueSites.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
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
                                Register User
                            </Button>
                        </Box>
                        {/* <Box>
                            <Typography variant="h6" color="text.secondary" align="center">
                                {'Copyright © AsiaConnect '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </Box> */}
                    </Box>

                </Container>
            </ThemeProvider>

        </div>
    );

}