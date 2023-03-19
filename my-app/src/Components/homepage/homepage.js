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
import { makeStyles } from "@material-ui/core";

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

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiPaper-root": {
      color: "black",
      height: 55
    }
  }
}));

function Navbarhome() {
  const classes = useStyles();
  return (
    <Box className={classes.root} sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar position="fixed" sx={{ background: "white" }}>
        <Toolbar>
          <Link to="/homepage">
            <img className="logo-img" src={aquasafeLogo} alt="logo" />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/dashboard">
              <Button variant="contained" sx={{ fontSize: 10 }}>
                Take a look
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="contained" sx={{ fontSize: 10, marginLeft: 2 }}>
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
