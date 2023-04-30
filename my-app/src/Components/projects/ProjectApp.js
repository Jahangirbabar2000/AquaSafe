import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Projects from './Projects';
import Sidebar2 from '../sidebar/Sidebar2';
import Navbar from '../navbar/navbar';
import { Grid } from '@mui/material';

const ProjectApp = () => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        // Make Axios request to fetch project details from the backend
        axios.get('http://localhost:8080/projects')
            .then(response => {
                console.log(response.data)
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
            <Grid marginLeft={47} marginTop={5}>
                <Grid>
                    <Projects projects={projectList} />
                </Grid>
            </Grid>
        </div>
    );
};

export default ProjectApp;
