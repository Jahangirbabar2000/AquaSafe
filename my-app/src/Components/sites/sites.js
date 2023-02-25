import * as React from 'react';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import List from "../dummyData/List";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Sidebar from '../sidebar/side-bar';
import "./sites.css";
import Navbar from "../navbar/navbar.js"
// import NewButton from '../button/button';
import { Link } from 'react-router-dom';
import ProjectMenu from './projects-menu/projects.js';
// import Button from "@mui/material/Button";
import Button from "react-bootstrap/Button";
function App(props) {

    React.useEffect(() => {     // CODE FOR FIXING MARKER PROBLEM ON MAP
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    const [inputText, setInputText] = React.useState("");
    let inputHandler = (e) => { // CODE FOR IMPLEMENTATOIN OF SEARCH BAR
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
      <div>
        <Navbar />
        <Sidebar name="sites" />
        <div className="menuContainer">
          <ProjectMenu />{" "}
        </div>
        <Grid container pl={40} pt={6} pb={10}>
          {/* <Grid item xs={3}>
            {" "} */}
          {/* Left small section*/}
          {/* <h2 className="projectName">Sites / Projects </h2>
            <div className="search">
              <TextField
                fullWidth
                className="inputRounded"
                onChange={inputHandler}
                id="input-with-icon-textfield"
                label="Search Project"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                variant="outlined"
              />
            </div> */}
          {/************ Countries/Pakistan ************/}
          {/* <Box sx={{ paddingTop: 5, maxWidth: 220 }}>
              <Card
                variant="outlined"
                sx={{
                  maxWidth: 200,
                  border: "3px solid #30b1d9",
                  borderRadius: "8px",
                  ":hover": {
                    boxShadow: 20 // theme.shadows[20]
                  }
                }}
              >
                <React.Fragment>
                  <CardContent>
                    <h3 class="ul">Pakistan</h3>

                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper"
                      }}
                      input={inputText}
                    />
                  </CardContent>
                </React.Fragment>
              </Card>
            </Box>
          </Grid> */}
          <Grid item sm={9} alignItems="flex=end" justifyContent="flex=end">
            <MapContainer
              className="siteMap"
              center={[33.702299, 73.13]}
              zoom={11}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[33.702299, 73.13]}>
                <Popup>
                  Location of this Project: <br /> Rawal Lake, Islamabad
                </Popup>
              </Marker>
            </MapContainer>
          </Grid>
        </Grid>
        <Grid container pl={85}>
          <Link to="/dashboard">
            <Button
              size="lg"
              style={{ fontSize: "20px" }}
              fullWidth
              variant="primary"
            >
              View Devices
            </Button>
            {/* <NewButton text={"View Devices"}></NewButton> */}
          </Link>
        </Grid>
      </div>
    );
}

export default App;