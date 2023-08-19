import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Projects from './Projects';
import Sidebar2 from '../sidebar/Sidebar2';
import Navbar from '../navbar/navbar';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const mdTheme = createTheme();

const ProjectApp = () => {
    const [projectList, setProjectList] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        // Make Axios request to fetch project details from the backend
        axios
            .get('http://localhost:8080/projects')
            .then((response) => {
                setProjectList(response.data);    
                if (response.data.length > 0) {
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200], minHeight: '100vh' }}>
                <Navbar />
                <Sidebar2 name="Projects" />
                <Grid
                    container
                    spacing={2}
                    sx={{ marginTop: '1rem', marginLeft: isMobile ? '3.2rem' : '8rem' }}
                >
                    <Grid item xs={12}>
                        <Projects projects={projectList} loading={loading} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default ProjectApp;
