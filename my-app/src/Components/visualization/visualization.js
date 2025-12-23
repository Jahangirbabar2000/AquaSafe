import React, { useState, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Parameters from "./ParamCard";
import LineGraph from "./graphs/LineChart";
import BarGraph from "./graphs/BarGraph";
import Box from "@mui/material/Box";
import { ResponsiveContainer } from "recharts";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./visualization.css";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HelpOutline } from "@mui/icons-material";
import { Paper, Typography, Menu, MenuItem, IconButton, Button, CircularProgress } from "@mui/material";
import Datepicker from "./datepicker";
import { useParams, useNavigate } from "react-router-dom";
import { dashboardAPI } from "../../services/api";
import { Icon } from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const mdTheme = createTheme();


function App(props) {


  React.useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/api/sse');

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      // console.log("NEW DATA:", newData)
      const dateAdjustedReading = newData.map(obj => {
        const dateOnlyString = new Date(obj.Time).toISOString().slice(0, 10);
        return { ...obj, Dates: dateOnlyString };
      });

      setInitialData((prevData) => [...prevData, ...dateAdjustedReading]);
      setData((prevData) => [...prevData, ...dateAdjustedReading]);
      // Update the dashboard with the new data
    };

    return () => {
      eventSource.close();
    };
  }, []);


  const { projectId } = useParams();
  ///// data = readings and stationCoordinates = modified deployedDevcies  //////////////

  const [project, setProject] = React.useState([]);
  const [initialData, setInitialData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [units, setUnits] = React.useState([]);
  const [selectedStation, setSelectedStation] = React.useState("");
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [stationCoordinates, setStationCoordinates] = React.useState([]); //Data of stations for the drop down menu

  //////////////////////////////////////////////////////////////
  const [loading, setLoading] = React.useState(true);
  const [startDate, setStartDate] = React.useState(moment(''));
  const [endDate, setEndDate] = React.useState(moment(''));
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [minDate, setMinDate] = React.useState(moment(''));
  const [maxDate, setMaxDate] = React.useState(moment(''));



  const getDataInitial = async () => {
    try {
      const response = await dashboardAPI.getDashboardData(projectId);
      const { project, deployedDevices, readings, units } = response.data;
      const dateOnlyReadings = readings.map((obj) => {
        const dateOnlyString = new Date(obj.Time).toISOString().slice(0, 10);
        return { ...obj, Dates: dateOnlyString };
      });

      return { dateOnlyReadings, project, deployedDevices, units };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const { dateOnlyReadings, project, deployedDevices, units } = await getDataInitial();
        setInitialData(dateOnlyReadings);
        setData(dateOnlyReadings);
        setLoading(false);
        setUnits(units);
        setProject(project);

        if (deployedDevices && deployedDevices.length > 0) {
          const stationCoordinates = deployedDevices.map((device) => ({
            Id: device.Id,
            Station: device.Name,
            Latitude: device.Latitude,
            Longitude: device.Longitude,
          }));

          if (stationCoordinates && stationCoordinates.length > 0) {
            setStationCoordinates(stationCoordinates);
            setSelectedMarker(stationCoordinates[0]);
            setSelectedStation(stationCoordinates[0]);
          }
        }

        if (dateOnlyReadings.length > 0) {
          const timeValues = dateOnlyReadings.map((obj) => new Date(obj.Time).getTime());
          const startDateValue = new Date(Math.min(...timeValues));
          const endDateValue = new Date(Math.max(...timeValues));

          const startMoment = moment(startDateValue);
          const endMoment = moment(endDateValue);

          setStartDate(startMoment);
          setEndDate(endMoment);
          setMinDate(startMoment);
          setMaxDate(endMoment);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [projectId]);

  const getDataBasedOnDates = () => {
    const sd = moment(startDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');
    const ed = moment(endDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');

    // Convert the dates to a Unix timestamp (number of milliseconds since 1970)
    const sdTimestamp = new Date(sd).getTime();
    const edTimestamp = new Date(ed).getTime();

    // Filter initialData between start and end dates
    const filteredData = initialData.filter(d => {
      const dTimestamp = new Date(d.Time).getTime();
      return dTimestamp >= sdTimestamp && dTimestamp <= edTimestamp;
    });

    setData(filteredData);
  };

  const stationNames = [...new Set(stationCoordinates.map((item) => item.Station))]; // Get distinct station names from data
  const filteredData = selectedMarker ? data.filter((d) => d.Device === selectedMarker.Id) : [];


  // Initialize the averages array with ParameterName and set sum and count to 0
  let averages = units.map(unit => ({
    ParameterName: unit.ParameterName,
    sum: 0,
    count: 0
  }));

  // Update the sum and count for each parameter in the averages array
  filteredData.forEach(reading => {
    let unit = averages.find(avg => avg.ParameterName === reading.Parameter);
    if (unit) {
      unit.sum += parseFloat(reading.Reading);
      unit.count += 1;
    }
  });

  // Calculate the average for each parameter by dividing the sum by the count
  averages = averages.map(avg => ({
    ParameterName: avg.ParameterName,
    average: avg.count > 0 ? avg.sum / avg.count : null
  }));

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

  useEffect(() => {
    if (startDate && endDate) {
      getDataBasedOnDates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarker]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuItemClick = (station) => {
    console.log(station)
    const foundStation = stationCoordinates.find((s) => s.Station === station);

    if (foundStation) {
      setSelectedMarker(foundStation);
      setSelectedStation(foundStation);
      const dataForStation = initialData.filter(d => d.Device === foundStation.Id);
      const timeValues = dataForStation.map(obj => new Date(obj.Time).getTime());
      const minDateValue = new Date(Math.min(...timeValues));
      const maxDateValue = new Date(Math.max(...timeValues));
      setStartDate(moment(minDateValue));
      setEndDate(moment(maxDateValue));
      getDataBasedOnDates()
    } else {
      console.log("Station not found");
    }
    setMenuOpen(false);
  };


  function handleMarkerClick(marker) {
    console.log(marker)
    setSelectedMarker(marker);
    if (marker) {
      setSelectedStation(marker.Station);
      const dataForStation = initialData.filter(d => d.Device === marker.Id);
      const timeValues = dataForStation.map(obj => new Date(obj.Time).getTime());
      const minDateValue = new Date(Math.min(...timeValues));
      const maxDateValue = new Date(Math.max(...timeValues));
      setStartDate(moment(minDateValue));
      setEndDate(moment(maxDateValue));
      getDataBasedOnDates()
      // setMinDate(moment(minDateValue));
      // setMaxDate(moment(maxDateValue));
    } else {
      console.log("No marker found");
    }
  }


  const navigate = useNavigate();

  const handleDeviceSubmit = async (event) => {
    event.preventDefault();
    navigate(`/deviceDeployment?project=${project[0].Id}`);
  };

  const customIcon = new Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const selectedIcon = new Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


  if (loading) {
    return (
      <ThemeProvider theme={mdTheme}>
        <MainLayout sidebarName="Dashboard">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
            <CircularProgress />
          </Box>
        </MainLayout>
      </ThemeProvider>
    );
  }

  if (!project || project.length === 0) {
    return (
      <ThemeProvider theme={mdTheme}>
        <MainLayout sidebarName="Dashboard">
          <Typography variant="h6" color="textSecondary" align="center">
            Project not found
          </Typography>
        </MainLayout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <MainLayout sidebarName="Dashboard">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12}>

            {/**************************************/}
            {/*           Right big section        */}
            {/**************************************/}

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: 2 }}>
              <Typography variant="h5">{project[0].Name + ', ' + project[0].Location + ', ' + project[0].Country}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5">{selectedMarker ? selectedMarker.Station : 'No Devices Yet!'}</Typography>
                <IconButton onClick={handleMenuOpen} sx={{ px: '0' }}>
                  <ExpandMoreIcon sx={{ fontSize: '2rem', padding: '0' }} />
                </IconButton>
                <Button onClick={handleDeviceSubmit} size='normal' variant="contained" color="primary">Add Device</Button>
                <Link to={`/projectManagement/${project[0].Id}`}>
                  <Button variant="contained" size='normal' color="primary">Edit Project</Button>
                </Link>
              </Box>

              <Menu
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                PaperProps={{
                  sx: {
                    '& .MuiMenuItem-root': { fontSize: '1.2rem', padding: '10px 20px' },
                    '& .Mui-selected': { backgroundColor: '#f0f0f0' },
                    '& .MuiMenu-list': { minWidth: '170px', maxHeight: '400px', overflow: 'auto' },
                  },
                }}
              >
                {stationNames.map((name) => (
                  <MenuItem
                    key={name}
                    onClick={() => {
                      setMenuOpen(false);
                      handleMenuItemClick(name);
                    }}
                    selected={selectedStation === name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" display="inline">
                  Average Readings
                </Typography>
                <Link to="/WaterQualityPage" className="unstyled-link">
                  <IconButton aria-label="help" sx={{ display: 'flex', alignItems: 'center' }}>
                    <HelpOutline />
                  </IconButton>
                </Link>
              </Box>

              {/**************************************/}
              {/*            TOP PARAMETERS          */}
              {/**************************************/}

              <Grid container spacing={2} wrap="nowrap" style={{ overflowX: 'auto', width: '100%', scrollbarWidth: 'thin' }}>
                {averages
                  .filter(average => average.average !== null && !isNaN(average.average) && average.average !== 'NA')
                  .map(average => {
                    const unit = units.find(unit => unit.ParameterName === average.ParameterName);
                    let color = "#de4545";
                    if (average.average >= unit.Min && average.average <= unit.Max) {
                      color = "#83b854";
                    }
                    return (
                      <Grid item key={unit.Id} xs={6} sm={3} md={2} style={{ flexShrink: 0, marginBottom: '20px', marginRight: "3px" }}>
                        <Parameters
                          color={color}
                          parameterName={unit.ParameterName}
                          value={`${average.average.toFixed(2)} ${unit.Unit}`}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Paper>

            <Grid container>
              {/**************************************/}
              {/*             DatePicker             */}
              {/**************************************/}
              <Grid item md={7}>
                <Paper sx={{ p: 2, mt: 2, mb: 2, mr: 0 }}>
                  <Datepicker startDate={startDate} setStartDate={setStartDate}
                    endDate={endDate} setEndDate={setEndDate} minDate={minDate} maxDate={maxDate} />
                  <Button variant="contained" onClick={getDataBasedOnDates} size="large"
                    sx={{ ml: 4, mt: 1 }}>View </Button>
                </Paper>


                {/**************************************/}
                {/*               2 GRAPHS             */}
                {/**************************************/}
                <Grid item>
                  {filteredData.length > 0 ? (
                    units
                      .filter((unit) => {
                        const unitData = filteredData
                          .filter((d) => d.Parameter === unit.ParameterName && d.UnitId === unit.Id && d.Reading !== null && !isNaN(d.Reading));
                        return unitData.length > 0;
                      })
                      .slice(0, 2)
                      .map((unit, index) => {
                        const unitData = filteredData
                          .filter((d) => d.Parameter === unit.ParameterName && d.UnitId === unit.Id && d.Reading !== null && !isNaN(d.Reading));
                        return (
                          <Paper key={unit.Id} sx={{ pl: 3, pr: 5, pt: 2, mt: 2 }}>
                            <Typography sx={{ pt: 1 }} variant="h5">{unit.ParameterName}</Typography>
                            <Typography sx={{ pt: 1 }} variant="body1">({unit.Unit})</Typography>
                            <ResponsiveContainer height={140}>
                              {(index % 2 === 0) ? (
                                <BarGraph
                                  data={unitData}
                                  datakey={'Reading'}
                                  min={unit.Min}
                                  max={unit.Max}
                                />
                              ) : (
                                <LineGraph
                                  data={unitData}
                                  datakey={'Reading'}
                                  min={unit.Min}
                                  max={unit.Max}
                                />
                              )}
                            </ResponsiveContainer>
                          </Paper>
                        );
                      })
                  ) : (
                    <Paper elevation={2} sx={{ p: 4, mt: 2, textAlign: 'center' }}>
                      <Typography variant="h4">No readings found!</Typography>
                    </Paper>
                  )}
                </Grid>
              </Grid>

              {/**************************************/}
              {/*                MAP                 */}
              {/**************************************/}

              <Grid item sx={{ mt: 5 }} md={5} sm={5} alignItems="flex=end" justifyContent="flex=end">
                <MapContainer
                  center={selectedMarker ? [selectedMarker.Latitude, selectedMarker.Longitude] : [22.449919, 114.163583]}
                  zoom={14}
                  scrollWheelZoom={true}
                  style={{
                    marginLeft: '6vh',
                    width: '53vh',
                    height: '65vh',
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {stationCoordinates.map((marker) => (
                    <Marker
                      key={marker.Station}
                      position={[marker.Latitude, marker.Longitude]}
                      icon={selectedMarker === marker ? selectedIcon : customIcon}
                      eventHandlers={{
                        click: () => {
                          handleMarkerClick(marker);
                        },
                      }}
                    >
                      <Popup className="popup-text">{marker.Station}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </Grid>
            </Grid>


            {/**************************************/}
            {/*           Rest of charts           */}
            {/**************************************/}

            <Grid item>
              {
                units
                  .filter((unit) => {
                    const unitData = filteredData
                      .filter((d) => d.Parameter === unit.ParameterName && d.UnitId === unit.Id && d.Reading !== null && !isNaN(d.Reading));
                    return unitData.length > 0;
                  })
                  .slice(2)
                  .map((unit, index) => {
                    const unitData = filteredData
                      .filter((d) => d.Parameter === unit.ParameterName && d.UnitId === unit.Id && d.Reading !== null && !isNaN(d.Reading));
                    return (
                      <Paper key={unit.Id} sx={{ pl: 3, pr: 5, pt: 2, mt: 2 }}>
                        <Typography sx={{ pt: 1 }} variant="h5">{unit.ParameterName}</Typography>
                        <Typography sx={{ pt: 1 }} variant="body1">({unit.Unit})</Typography>
                        <ResponsiveContainer height={140}>
                          {(index % 2 === 0) ? (
                            <BarGraph
                              data={unitData}
                              datakey={'Reading'}
                              min={unit.Min}
                              max={unit.Max}
                            />
                          ) : (
                            <LineGraph
                              data={unitData}
                              datakey={'Reading'}
                              min={unit.Min}
                              max={unit.Max}
                            />
                          )}
                        </ResponsiveContainer>
                      </Paper>
                    );
                  })
              }
            </Grid>
          </Grid>
        </Grid>
      </MainLayout>
    </ThemeProvider>
  );
}


export default App;
