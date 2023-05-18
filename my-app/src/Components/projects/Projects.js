import React from 'react';
import { Container, Grid, Card, Skeleton, Stack } from "@mui/material";
import ProjectCard from './ProjectCard';
import { useNavigate } from 'react-router-dom';

const Projects = ({ projects, loading }) => {
  const navigate = useNavigate();

  const handleCardClick = (project) => {
    navigate(`/dashboard/${project.Id}`);
  };

  if (loading) {
    // Display skeleton cards while loading
    return (
      <Container maxWidth="lg" sx={{ marginBottom: '2.3rem' }}>
        <Grid container spacing={2}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: '100%', margin: '0.5rem', padding: '1rem' }}>
                <Stack spacing={2}>
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton animation="wave" variant="circular" width={40} height={40} />
                  <Skeleton animation="wave" variant="rectangular" width={210} height={60} />
                  <Skeleton animation="wave" variant="rounded" width={210} height={60} />
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

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
