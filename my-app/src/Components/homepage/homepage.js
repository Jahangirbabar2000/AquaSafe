import React from "react";
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

const CenteredLogos = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  height: 70,
  marginLeft:390
});

function Navbarhome() {
  return (
    <Root>    
      <Box sx={{ flexGrow: 1, marginBottom: 7 }}>
        <AppBar position="fixed" sx={{ background: "white" }}>
          <Toolbar>
          <Link to="/homepage" style={{ textDecoration: 'none' }}>
                <img className="logo-img" style={{height: 40}} src={aquasafeLogo} alt="aquasafe logo" />
              </Link>
            <CenteredLogos>
            {/* <Link to="/homepage" style={{ textDecoration: 'none' }}>
            <img style={{ height: 45, marginBottom: 0 }} src={aquasafeLogo} alt="aquasafe logo" />
            </Link> */}
              <img style={{ height: 50, marginBottom: 0, marginLeft: 30 }} src={asiaconnectLogo} alt="asiaconnect logo" />
              <img style={{ height: 45, marginLeft: 30, marginRight: 0, marginBottom:12 }} src={teinLogo} alt="tein logo" />
              <img style={{ height: 70, marginLeft: 30 }} src={nustlogo} alt="NUST logo" />
            </CenteredLogos>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
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