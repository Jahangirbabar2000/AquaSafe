import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function DashboardRedirect() {
  const [projectId, setProjectId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the first project
    axios.get('http://localhost:8080/projects')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setProjectId(response.data[0].Id);
        } else {
          // If no projects, redirect to projects page
          setProjectId('no-projects');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setProjectId('no-projects');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (projectId === 'no-projects') {
    return <Navigate to="/projects" replace />;
  }

  return <Navigate to={`/dashboard/${projectId}`} replace />;
}

export default DashboardRedirect;

