// Projects.js
import React from 'react';
import { Container, Grid } from "@mui/material";
import ProjectCard from './ProjectCard';
import { useNavigate } from 'react-router-dom';

const Projects = ({ projects }) => {
  const navigate = useNavigate();

  const handleCardClick = (project) => {
    console.log('Clicked project: ', project);
    // Navigate to a different page
    navigate('/dashboard');
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item key={project.Id}>
            <ProjectCard project={project} onCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;
