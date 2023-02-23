import * as React from 'react';
import Grid from '@mui/material/Grid';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Sidebar from '../sidebar/side-bar';
import "./sites.css";
import Navbar from "../navbar/navbar.js"
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ProjectMenu from '../projects-menu/projects';
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

    return (        
      <div>
        <Navbar />
        <Sidebar name="sites" />
            <div className="menuContainer"><ProjectMenu /> </div>
        <Grid container pl={40} pt={6} pb={10}>          
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
          <Button sx={{fontSize:16}} fullWidth variant="contained">View Devices</Button>
          </Link>
        </Grid>
      </div>
    );
}

export default App;