import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import axios from "axios";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, FormControlLabel, Typography, MenuItem, Paper, TextField, Button, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import Sidebar2 from "../../sidebar/Sidebar2";
import Navbar from "../../navbar/navbar";
import { Box } from '@mui/system';

const INITIAL_FORM_STATE = {
  name: "",
  latitude: "",
  longitude: "",
  frequency: "",
  timeUnit: "",
  sensors: [],
};

const DeviceDeployment = () => {
  const [sensors, setSensors] = useState([]);
  const [markerPosition, setMarkerPosition] = useState([33.703055, 73.128089]);
  const [parameterUnits, setParameterUnits] = useState({});
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [timeUnit, setTimeUnit] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');

  const query = useQuery();
  const deviceId = query.get("deviceId");
  const isEditMode = !!deviceId;
  const selectedDeviceId = isEditMode ? deviceId : undefined;
  const navigate = useNavigate();

  const handleMapClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    const newLat = parseFloat(lat.toFixed(6));
    const newLng = parseFloat(lng.toFixed(6));
    setMarkerPosition([newLat, newLng]);
  }, []);

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#ffffff',
          },
          root: {
            paddingTop: 8,
            paddingBottom: 7,
          },
        },
      },
    },
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }



  useEffect(() => {
    fetchSensors();
    const Id = query.get("project");
    setProjectId(Id)

    axios.get(`http://localhost:8080/api/projects/${Id}`)
      .then(response => {
        const projectName = response.data.Name;
        setProjectName(projectName);
        if (!isEditMode) {
          setMarkerPosition([response.data.Latitude, response.data.Longitude])
        }
      })
      .catch(error => {
        console.error(error);
      });

    const deviceId = query.get("deviceId");
    if (deviceId) {
      // Retrieve the device details using the deviceId and update the form state for editing
      axios.get(`http://localhost:8080/api/deployeddevices/${deviceId}`)
        .then(response => {
          const { Name, Longitude, Latitude, Frequency } = response.data;
          const initialFormState = {
            name: Name,
            latitude: Latitude,
            longitude: Longitude,
            frequency: Frequency.split(" ")[0],
            timeUnit: Frequency.split(" ")[1],
            sensors: [],
          };
          console.log(initialFormState)
          setMarkerPosition([Latitude, Longitude])
          setFormState(initialFormState);

        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function UpdateMapCenter({ center }) {
    const map = useMap();

    useEffect(() => {
      map.setView(center);
    }, [center, map]);

    return null;
  }

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
      <UpdateMapCenter center={markerPosition} />
    </MapContainer>
  ), [handleMapClick, markerPosition]);

  function MapEvents({ onClick }) {
    useMapEvents({
      click(e) {
        onClick(e);
      },
    });
    return null;
  }

  const fetchSensors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/parameters");
      const uniqueSensors = Array.from(
        new Set(response.data.map((sensor) => sensor.Name))
      ).map((name) => {
        return response.data.find((sensor) => sensor.Name === name);
      });
      setSensors(uniqueSensors);

      const fetchedParameterUnits = response.data.reduce((acc, item) => {
        if (!acc[item.Name]) {
          acc[item.Name] = [];
        }
        acc[item.Name].push(item.Unit);
        return acc;
      }, {});
      setParameterUnits(fetchedParameterUnits);

      const initialFormState = {
        ...formState, // Keep the existing form state
        timeUnit: "Minute",
        sensors: [],
        ...Object.keys(fetchedParameterUnits).reduce((acc, paramName) => {
          acc[`${paramName}_unit`] = fetchedParameterUnits[paramName][0];
          return acc;
        }, {}),
      };
      setFormState(initialFormState);

    } catch (error) {
      console.error("Error fetching sensors: ", error);
    }
  };

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

  const sensorList = useMemo(() => (
    sensors.map((sensor) => (
      <TableRow key={sensor.Name} style={{ backgroundColor: "#ffffff" }}>
        <TableCell padding="checkbox">
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.sensors.some((item) => item.sensor === sensor.Name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormState(prevState => {
                    let updatedSensors;
                    if (isChecked) {
                      updatedSensors = [...prevState.sensors, { sensor: sensor.Name, unit: prevState[`${sensor.Name}_unit`] }];
                    } else {
                      updatedSensors = prevState.sensors.filter((item) => item.sensor !== sensor.Name);
                    }
                    return { ...prevState, sensors: updatedSensors };
                  });
                }}
              />
            }
            label=""
          />
        </TableCell>
        <TableCell>{sensor.Name}</TableCell>
        <TableCell>
          <TextField
            select
            variant="standard"
            value={formState[`${sensor.Name}_unit`] || ""}
            onChange={(e) => {
              const unit = e.target.value;
              setFormState(prevState => ({
                ...prevState,
                [`${sensor.Name}_unit`]: unit,
                sensors: prevState.sensors.map((item) => {
                  if (item.sensor === sensor.Name) {
                    return { ...item, unit };
                  }
                  return item;
                }),
              }));
            }}
            fullWidth
          >
            {parameterUnits[sensor.Name]?.map((unit, index) => (
              <MenuItem key={index} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
      </TableRow>
    ))
  ), [sensors, formState, parameterUnits]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isEditMode ? `http://localhost:8080/api/deployeddevices/${selectedDeviceId}` : "http://localhost:8080/api/deployeddevices";
      const method = isEditMode ? "PUT" : "POST";

      const response = await axios({
        method: method,
        url: endpoint,
        data: {
          Name: formState.name,
          Longitude: markerPosition[1],
          Latitude: markerPosition[0],
          Frequency: formState.frequency + " " + timeUnit,
          Project: projectId,
          Locality: "Locality",
          CommTech: "LORAWAN",
          StatusCode: 200,
          Sensors: JSON.stringify(formState.sensors),
        },
      });

      if (response.status === 201 || response.status === 200) {
        navigate(`/dashboard/${projectId}`);
      } else {
        alert("Error adding/editing device.");
      }
    } catch (error) {
      console.error("Error posting/editing data: ", error);
      alert("Error adding/editing device.");
    }
  };

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200], minHeight: '100vh' }}>
      <Navbar />
      <Grid container>
        <div style={{ display: "grid", gridTemplateColumns: "27vh auto", backgroundColor: "#f2f2f2" }}>
          <Grid item xs={3}>
            <Sidebar2 name="Devices" />
          </Grid>
          <Grid item xs={9}>
            <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
              <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                <div style={{ marginTop: "1vh", marginLeft: "18vh" }}>
                  <div style={{ minWidth: "450px", paddingTop: "2%", paddingBottom: "3%", backgroundColor: "#ffffff", borderRadius: "5%", marginTop: "25px", padding: "7%", boxShadow: "0px 0px 10px #888888", marginLeft: "1rem" }}>
                    <Typography variant="h5" gutterBottom>General Device Details</Typography>
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: "flex", marginBottom: 5 }}>
                        <TextField
                          name="name"
                          label="Name"
                          fullWidth
                          variant="standard"
                          value={formState.name || ""}
                          onChange={(e) => {
                            const name = e.target.value;
                            setFormState(prevState => ({ ...prevState, name }));
                          }}
                          style={{ marginRight: "10px" }}
                        />

                        <TextField
                          disabled
                          label="Project"
                          fullWidth
                          variant="standard"
                          value={projectName}
                          onChange={(e) => {
                            const name = e.target.value;
                            setProjectName(name);
                          }}
                          style={{ marginLeft: "10px" }}
                        />

                      </div>
                      <div style={{ display: "flex", marginBottom: 5 }}>
                        <TextField
                          fullWidth
                          name="latitude"
                          label="Latitude"
                          value={markerPosition[0]}
                          variant="standard"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const newLatitude = inputValue !== "" ? parseFloat(inputValue) : 0;
                            setMarkerPosition([newLatitude, markerPosition[1]]);
                          }}
                          style={{ marginRight: "10px" }}
                        />
                        <TextField
                          name="longitude"
                          label="Longitude"
                          variant="standard"
                          fullWidth
                          value={markerPosition[1]}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const newLongitude = inputValue !== "" ? parseFloat(inputValue) : 0;
                            setMarkerPosition([markerPosition[0], newLongitude]);
                          }}
                          style={{ marginLeft: "10px" }}
                        />
                      </div>

                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        <TextField
                          fullWidth
                          name="frequency"
                          label="Frequency"
                          variant="standard"
                          value={formState.frequency}
                          onChange={(e) => {
                            const frequency = e.target.value;
                            setFormState(prevState => ({ ...prevState, frequency }));
                          }}
                          style={{ marginRight: "10px" }}
                        />
                        <TextField
                          name="timeUnit"
                          label="Unit"
                          select
                          fullWidth
                          variant="standard"
                          value={timeUnit}
                          onChange={(e) => setTimeUnit(e.target.value)}
                          style={{ marginLeft: "10px" }}
                        >
                          {['Minute', 'Hour', 'Day', 'Month'].map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div>
                        <TableContainer component={Paper} style={{ maxHeight: 250, overflow: 'auto' }}>
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
                                {sensorList}
                              </TableBody>
                            </Table>
                          </ThemeProvider>
                        </TableContainer>
                      </div>
                      <div style={{ height: 25 }}></div>
                      <Button variant="contained" color="primary" fullWidth type="submit">
                        {isEditMode ? "Edit Device" : "Add Device"}
                      </Button>
                    </form>
                  </div>
                </div>
                <div style={{ paddingTop: "50px", paddingLeft: "13%" }}>
                  <Typography variant="h5" gutterBottom>Select location from map:</Typography>
                  {map}
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
    </Box >
  );
};

export default DeviceDeployment;
