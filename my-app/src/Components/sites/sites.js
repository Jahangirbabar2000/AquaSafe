import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import Sidebar from "../sidebar/side-bar";
import "./sites.css";
import Navbar from "../navbar/navbar.js";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProjectMenu from "./projects-menu/projects";

function Sites() {
  const [selectedCoordinates, setSelectedCoordinates] = useState([31.99, 77.13]);
  const mapRef = useRef();

  useEffect(() => {
    // CODE FOR FIXING MARKER PROBLEM ON MAP
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });

    // update map center when selectedCoordinates changes
    if (mapRef.current && selectedCoordinates && selectedCoordinates.length === 2) {
      const [lat, lng] = selectedCoordinates;
      mapRef.current.setView([lat, lng], 11);
      mapRef.current.invalidateSize();
    }
  }, [selectedCoordinates, mapRef]);




  return (
    <div>
      <Navbar />
      <Sidebar name="sites" />
      <div className="menuContainer">
        <ProjectMenu setSelectedCoordinates={setSelectedCoordinates} />
      </div>
      <Grid container pl={40} pt={6} pb={10}>
        <Grid item sm={9} alignItems="flex=end" justifyContent="flex=end">
          <MapContainer
            className="siteMap"
            center={selectedCoordinates}
            zoom={11}
            scrollWheelZoom={true}
            whenCreated={(map) => {
              // store map object in ref
              mapRef.current = map;
            }}
          >
            {console.log('MapContainer re-rendered')}
            {console.log('Center prop:', selectedCoordinates)}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedCoordinates}>
              <Popup>
                Location of this Project: <br /> Rawal Lake, Islamabad
              </Popup>
            </Marker>

          </MapContainer>
        </Grid>
      </Grid>
      <Grid container pl={85}>
        <Link to="/dashboard">
          <Button style={{ fontSize: "20px" }} fullWidth variant="primary">View Devices</Button>
        </Link>
      </Grid>
    </div>
  );
}

export default Sites;
