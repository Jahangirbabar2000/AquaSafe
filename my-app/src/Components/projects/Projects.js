// Projects.js
import React from 'react';
import { Container, Grid } from "@mui/material";
import ProjectCard from './ProjectCard';
import { useNavigate } from 'react-router-dom';

const Projects = ({ projects }) => {
  const navigate = useNavigate();

  const handleCardClick = (project) => {
    navigate(`/dashboard/${project.Id}`);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item key={project.Id} xs={12} sm={6} md={4} lg={3}>
            <ProjectCard project={project} onCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    </Container>

  );
};

export default Projects;
