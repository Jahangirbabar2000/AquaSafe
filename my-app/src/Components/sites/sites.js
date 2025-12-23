import React, { useState, useEffect, useMemo } from "react";
import { Grid, Button, Box } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ProjectMenu from "./projects-menu/projectsMenu";

/**
 * MapCenter - Component to update map view when coordinates change
 */
const MapCenter = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coordinates, 13);
    map.invalidateSize();
  }, [coordinates, map]);
  return null;
};

/**
 * Sites - Displays project locations on an interactive map
 */
const Sites = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState([31.99, 77.13]);
  const [selectedProjectId, setSelectedProjectId] = useState("1");

  useEffect(() => {
    // Fix Leaflet marker icon issue
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  const map = useMemo(
    () => (
      <MapContainer
        style={{ width: "100%", height: "100%" }}
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
        <MapCenter coordinates={selectedCoordinates} />
      </MapContainer>
    ),
    [selectedCoordinates]
  );

  return (
    <MainLayout sidebarName="Sites">
      <Box sx={{ mb: 3 }}>
        <ProjectMenu
          setSelectedCoordinates={setSelectedCoordinates}
          setSelectedProjectId={setSelectedProjectId}
        />
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              width: "100%",
              height: { xs: "40vh", md: "50vh" },
              "& .leaflet-container": {
                width: "100%",
                height: "100%",
                borderRadius: 1,
              },
            }}
          >
            {map}
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          component={Link}
          to={`/dashboard/${selectedProjectId}`}
          variant="contained"
          sx={{ fontSize: "16px" }}
        >
          View Devices
        </Button>
      </Box>
    </MainLayout>
  );
};

export default Sites;
