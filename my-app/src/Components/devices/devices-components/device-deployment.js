import React, { useState, useEffect, useMemo } from "react";
import Sidebar2 from "../../sidebar/Sidebar2";
import Navbar from "../../navbar/navbar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, FormControlLabel, MenuItem, Paper, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';


const INITIAL_FORM_STATES = {
  latitude: "",
  longitude: "",
  frequency: "",
  timeUnit: "",
  sensors: []
};

const FORM_VALIDATION = Yup.object().shape({
  frequency: Yup.number().required("Frequency is required"),
  timeUnit: Yup.string().required("Unit is required"),
});

const checkboxOptions = ["Minute", "Hour", "Day", "month"];

const SENSOR_UNITS = {
  "pH": ["pH"],
  "Water Temperature": ["°C", "°F"],
  "Turbidity": ["NTU", "FTU"],
  "Total Phosphorus": ["mg/L", "µg/L"],
  "Suspended solids": ["mg/L"],
  "Nitrite-Nitrogen (NO2-N)": ["mg/L"],
  "Nitrate-Nitrogen (NO3-N)": ["mg/L"],
  "Dissolved Oxygen": ["mg/L", "ppm", "% saturation"],
  "Ammonia-Nitrogen (NH3-N)": ["mg/L"],
  "5-day Biochemical Oxygen Demand (BOD5)": ["mg/L"],
};


const DeviceDeployment = () => {
  const [sensors, setSensors] = useState([]);
  const [searchParams] = useSearchParams();
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const [markerPosition, setMarkerPosition] = useState([parseFloat(latitude) || 33.703055, parseFloat(longitude) || 73.128089]);

  function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    const newLat = parseFloat(lat.toFixed(6));
    const newLng = parseFloat(lng.toFixed(6));
    setMarkerPosition([newLat, newLng]);
  }

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: 'whitesmoke',
          },
          root: {
            paddingTop: 8,
            paddingBottom: 7,
          },
        },
      },
    },
  });


  useEffect(() => {
    const fetchSensors = async () => {
      const response = await axios.get("http://localhost:8080/parameters");
      setSensors(response.data);
    };
    fetchSensors();
  }, []);

  useEffect(() => {
    // CODE FOR FIXING MARKER PROBLEM ON MAP
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  const map = useMemo(() => (
    <MapContainer
      style={{ marginRight: "10vh", width: "70vh", height: "60vh" }}
      center={markerPosition}
      zoom={14}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={markerPosition}>
        <Popup>
          Latitude: {markerPosition[0]} <br /> Longitude: {markerPosition[1]}
        </Popup>
      </Marker>
      <MapEvents onClick={handleMapClick} />
      <MapCenter />
    </MapContainer>
  ), [markerPosition]);

  function MapCenter() {
    const map = useMap();
    map.setView(markerPosition);
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
          <Sidebar2 name="Devices" />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100vh",
              backgroundColor: "#f2f2f2",
            }}
          >
            <div
              style={{
                marginTop: "5vh",
                marginLeft: "18vh",
              }}
            >
              <div
                style={{
                  minWidth: "450px",
                  paddingTop: "3%",
                  paddingBottom: "3%",
                  background: "whitesmoke",
                  borderRadius: "5%",
                  marginTop: "15px",
                  padding: "7%",
                  boxShadow: "0px 0px 10px #888888",
                  marginLeft: "1rem",
                }}
              >
                <h2>General Device Details</h2>
                <Formik
                  initialValues={{
                    ...INITIAL_FORM_STATES,
                    timeUnit: "Minute", // Set default value for timeUnit
                    sensors: [],
                    ...sensors.reduce((acc, sensor) => {
                      acc[`${sensor.Name}_unit`] = SENSOR_UNITS[sensor.Name][0];
                      return acc;
                    }, {}),
                  }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >

                  {(props) => (
                    <Form>
                      <div style={{ display: "flex" }}>
                        <TextField
                          name="latitude"
                          label="Latitude"
                          value={markerPosition[0]}
                          variant="standard"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            let newLatitude = 0;
                            if (inputValue !== "") {
                              newLatitude = parseFloat(inputValue);
                              if (isNaN(newLatitude)) {
                                newLatitude = 0;
                              }
                            }
                            setMarkerPosition([newLatitude, markerPosition[1]]);
                          }}
                          style={{ marginRight: "10px" }}
                        />

                        <TextField
                          name="longitude"
                          label="Longitude"
                          variant="standard"
                          value={markerPosition[1]}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            let newLongitude = 0;

                            if (inputValue !== "") {
                              newLongitude = parseFloat(inputValue);
                              if (isNaN(newLongitude)) {
                                newLongitude = 0;
                              }
                            }
                            setMarkerPosition([markerPosition[0], newLongitude]);
                          }}
                        />
                      </div>

                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        <TextField
                          name="frequency"
                          label="Frequency"
                          variant="standard"
                          style={{ marginRight: "10px" }}
                        />
                        <TextField
                          name="timeUnit"
                          label="Unit"
                          select
                          fullWidth
                          variant="standard"
                          style={{ marginLeft: "15px" }}
                        >
                          {checkboxOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div>
                        <h2>Sensors</h2>
                        <TableContainer component={Paper} style={{ maxHeight: 200, overflow: 'auto' }}>
                          <ThemeProvider theme={theme}>
                            <Table stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell padding="checkbox">
                                    <Check />
                                  </TableCell>

                                  <TableCell>Sensor Name</TableCell>
                                  <TableCell>Unit</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {sensors.map((sensor) => (
                                  <TableRow key={sensor.Name} style={{ backgroundColor: 'whitesmoke' }}>
                                    <TableCell padding="checkbox">
                                      <FormControlLabel
                                        control={
                                          <Field
                                            as={Checkbox}
                                            name="sensors"
                                            value={sensor.Name}
                                          />
                                        }
                                        label=""
                                      />
                                    </TableCell>
                                    <TableCell>{sensor.Name}</TableCell>
                                    <TableCell>
                                      <TextField
                                        name={`${sensor.Name}_unit`}
                                        select
                                        fullWidth
                                        variant="standard"
                                        value={props.values[`${sensor.Name}_unit`]} // Set the value attribute here
                                      >

                                        {SENSOR_UNITS[sensor.Name].map((unit, index) => (
                                          <MenuItem key={index} value={unit}>
                                            {unit}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </TableCell>

                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </ThemeProvider>
                        </TableContainer>

                      </div>

                      <div style={{ height: 25 }}></div>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={props.submitForm}
                      >
                        Add Device
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div
              style={{
                paddingTop: "50px",
                paddingLeft: "10% ",
              }}
            >
              <h2>Select location from map:</h2>
              {map}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

function MapEvents({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e);
    },
  });
  return null;
}

export default DeviceDeployment;