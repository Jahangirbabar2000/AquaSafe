import React, { useState, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import Sidebar2 from "../sidebar/Sidebar2";
import Navbar from "../navbar/navbar.js";
import { Link } from "react-router-dom";
import ProjectMenu from "./projects-menu/projectsMenu";
import Button from "@mui/material/Button";

function Sites() {
  const [selectedCoordinates, setSelectedCoordinates] = useState([31.99, 77.13]);
  const [selectedProjectId, setSelectedProjectId] = useState("1");

  useEffect(() => {
    // CODE FOR FIXING MARKER PROBLEM ON MAP
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  const map = useMemo(() => (
    <MapContainer
      style={{ marginLeft: "5vh", width: "100vh", height: "50vh" }}
      center={selectedCoordinates}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={selectedCoordinates}>
        <Popup>
          Location of this Project: <br /> Rawal Lake, Islamabad
        </Popup>
      </Marker>
      <MapCenter />
    </MapContainer>
  ), [selectedCoordinates]);

  function MapCenter() {
    const map = useMap();
    map.setView(selectedCoordinates, 13);
    map.invalidateSize();
    return null;
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "27vh auto"
        }}
      >
        <div>
          <Sidebar2 name="Sites" />
        </div>
        <div>
          <div
            style={{
              height: "5.5vh",
              width: "100%",
              boxSizing: "border-box"
            }}
          >
            <ProjectMenu setSelectedCoordinates={setSelectedCoordinates} setSelectedProjectId={setSelectedProjectId} />
          </div>

          <Grid container pl={35} pt={9} pb={6}>
            <Grid item sm={9} alignItems="flex-end" justifyContent="flex-end">
              {map}
            </Grid>
          </Grid>
          <Grid container pl={75}>
            <Link to={`/dashboard/${selectedProjectId}`} style={{ textDecoration: "none" }}>
              <Button style={{ fontSize: "16px" }} variant="contained">
                View Devices
              </Button>
            </Link>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Sites;
