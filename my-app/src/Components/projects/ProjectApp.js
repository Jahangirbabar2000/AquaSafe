import React, { useEffect, useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import Projects from './Projects';
import { projectsAPI } from '../../services/api';

/**
 * ProjectApp - Main container for the Projects page
 * Displays a grid of project cards with loading and empty states
 */
const ProjectApp = () => {
    const [projectList, setProjectList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectsAPI.getAll();
                setProjectList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <MainLayout sidebarName="Projects">
            <Projects projects={projectList} loading={loading} />
        </MainLayout>
    );
};

export default ProjectApp;
