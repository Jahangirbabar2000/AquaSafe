// Projects.js
import React from 'react';
import { Container, Grid } from '@material-ui/core';
import ProjectCard from './ProjectCard';

const Projects = ({ projects }) => {
  const handleCardClick = (project) => {
    console.log('Clicked project: ', project);
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
