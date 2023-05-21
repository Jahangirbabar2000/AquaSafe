import React, { useEffect, useState } from "react";
import "./homepage.css";
import First from "./first.js";
import Second from "./second";
import Third from "./third";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

//for navbar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import aquasafeLogo from "../../AquaSafe.png";
import { styled } from '@mui/system';
import axios from 'axios';

function Home() {
  return (
    <div>
      <Navbarhome />
      <First />
      <Second />
      <Third />
      <div className=""></div>
    </div>
  );
}

export default Home;


const Root = styled('div')(({ theme }) => ({
  "& .MuiPaper-root": {
    color: "black",
    height: 55
  }
}));



function Navbarhome() {
  const [projectId, setProjectId] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/projects')
      .then(response => {
        // Update state with fetched notifications
        setProjectId(response.data[0].Id);
      })
      .catch(error => {
        console.error('There was an error fetching notifications!', error);
      });
  }, []);

  return (
    <Root>
      <Box sx={{ flexGrow: 1, marginBottom: 7 }}>
        <AppBar position="fixed" sx={{ background: "white" }}>
          <Toolbar>
            <Link to="/homepage" style={{ textDecoration: 'none' }}>
              <img className="logo-img" src={aquasafeLogo} alt="logo" />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to={`/dashboard/${projectId}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ fontSize: 10 }}>
                  Take a look
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ fontSize: 10, marginLeft: 2 }}>
                  Login
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Root>
  );
}
