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
import nustlogo from "../../nust.png";
import asiaconnectLogo from "../../asiaconenct-logo.png";
import teinLogo from "../../tein-logo.png";
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
    height: 75
  }
}));

const CenteredLogos = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  height: 70,
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'none'
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
                <img className="logo-img" style={{height: 40}} src={aquasafeLogo} alt="aquasafe logo" />
              </Link>
            <CenteredLogos>
              <img style={{ height: '50px', maxHeight: '50px', objectFit: 'contain' }} src={asiaconnectLogo} alt="asiaconnect logo" />
              <img style={{ height: '45px', maxHeight: '45px', objectFit: 'contain' }} src={teinLogo} alt="tein logo" />
              <img style={{ height: '70px', maxHeight: '70px', objectFit: 'contain' }} src={nustlogo} alt="NUST logo" />
            </CenteredLogos>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ fontSize: { md: 12, lg: 14 }, whiteSpace: 'nowrap' }}>
                  Take a look
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ fontSize: { md: 12, lg: 14 }, whiteSpace: 'nowrap' }}>
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