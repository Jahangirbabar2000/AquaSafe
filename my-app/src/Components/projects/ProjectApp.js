import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Projects from './Projects';
import Sidebar2 from '../sidebar/Sidebar2';
import Navbar from '../navbar/navbar';
import { Grid, useMediaQuery, useTheme } from '@mui/material';

const ProjectApp = () => {
    const [projectList, setProjectList] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        // Make Axios request to fetch project details from the backend
        axios.get('http://localhost:8080/projects')
            .then(response => {
                setProjectList(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    return (
        <div style={{ backgroundColor: '#f2f2f2' }}>
            <Navbar />
            <Sidebar2 name="Projects" />
            <Grid container spacing={2} sx={{ marginTop: '1rem', marginLeft: isMobile ? '3.2rem' : '0' }}>
                <Grid item xs={12}>
                    <Projects projects={projectList} />
                </Grid>
            </Grid>

        </div>
    );
};

export default ProjectApp;
