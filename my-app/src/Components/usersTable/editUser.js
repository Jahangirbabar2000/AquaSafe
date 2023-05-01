import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Container, Box, Typography, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Navbar from "../navbar/navbar.js";
import Sidebar2 from "../sidebar/Sidebar2";
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme();

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [projectList, setProjectList] = useState([]);
    const [uniqueSites, setUniqueSites] = useState([]);

    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${id}`);
            setUser(response.data);
        } catch (err) {
            console.error(err);
        }
    }, [id]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        // Make Axios request to fetch project details from the backend
        axios.get('http://localhost:8080/projects')
            .then(response => {
                setProjectList(response.data);
                const filteredSites = response.data
                    .filter((project) => project.Country === user?.Country)
                    .map((project) => project.Name);
                setUniqueSites(filteredSites);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, [user?.Country]);

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


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${id}`, user);
            navigate('/userstable');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Navbar />
            <Sidebar2 />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <Box sx={{ marginLeft: 15, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 55, height: 55 }}>
                            <EditOutlinedIcon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h4">
                            Edit User
                        </Typography>
                        <Grid container spacing={3} mt={1}>
                            {user && (
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="FirstName"
                                                label="First Name"
                                                value={user.FirstName}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="LastName"
                                                label="Last Name"
                                                value={user.LastName}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="Email"
                                                label="Email"
                                                value={user.Email}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="designation"
                                                fullWidth
                                                select
                                                name="Designation"
                                                label="Designation"
                                                value={user.Designation}
                                                onChange={handleInputChange}
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
                                                name="Country"
                                                label="Country"
                                                value={user.Country}
                                                onChange={handleInputChange}
                                                fullWidth
                                                select
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
                                                name="Site"
                                                label="Site"
                                                value={user.Site}
                                                onChange={handleInputChange}
                                                fullWidth
                                                select
                                                disabled={!user.Country}
                                            >
                                                {uniqueSites.map((site) => (
                                                    <MenuItem key={site} value={site}>
                                                        {site}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="Password"
                                                label="Password"
                                                type="password"
                                                value={user.Password}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                                Save Changes
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default EditUser;
