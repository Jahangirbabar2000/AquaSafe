import * as React from "react";
import Grid from "@mui/material/Grid";
import moment, { max, min } from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Parameters from "./ParamCard";
import LineGraph from "./graphs/LineChart";
import BarGraph from "./graphs/BarGraph";
import Box from "@mui/material/Box";
import { ResponsiveContainer } from "recharts";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./visualization.css";
import { Link } from 'react-router-dom';
import Navbar from "../navbar/navbar.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HelpOutline } from '@mui/icons-material';
import Sidebar2 from "../sidebar/Sidebar2";
import { Paper, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import Datepicker from "./datepicker";
import Button from '@mui/material/Button';
import { Icon } from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from "react-router-dom";

const mdTheme = createTheme();


function App(props) {
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

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
    setMenuOpen(true);
  };

  const fetchData = (url) => {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          const { project, deployedDevices, readings, units } = response.data;
          const dateOnlyReadings = readings.map(obj => {
            const dateOnlyString = new Date(obj.Time).toISOString().slice(0, 10);
            return { ...obj, Dates: dateOnlyString };
          });
          setInitialData(dateOnlyReadings);
          setLoading(false);
          setUnits(units);
          setProject(project);
          const stationCoordinates = deployedDevices.map(device => ({
            Id: device.Id,
            Station: device.Name,
            Latitude: device.Latitude,
            Longitude: device.Longitude
          }));

          if (!selectedStation) {
            setStationCoordinates(stationCoordinates);
            setSelectedMarker(stationCoordinates[0]);
            setSelectedStation(stationCoordinates[0]);
          }

          const timeValues = dateOnlyReadings.map(obj => new Date(obj.Time).getTime());
          const startDateValue = new Date(Math.min(...timeValues));
          const endDateValue = new Date(Math.max(...timeValues));

          const startMoment = moment(startDateValue);
          const endMoment = moment(endDateValue);

          setStartDate(startMoment);
          setEndDate(endMoment);

          resolve({ startMoment, endMoment });
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  };

  const getDataInitial = async () => {
    const url = `http://localhost:8080/api/dashboard/${projectId}`;
    fetchData(url)
      .then(({ startMoment, endMoment }) => {
        setMinDate(startMoment);
        setMaxDate(endMoment);
        setData(initialData);
      });
  };

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
  const filteredData = data.filter((d) => d.Device === selectedMarker.Id);

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

  React.useEffect(() => {
    // CODE FOR FIXING MARKER PROBLEM ON MAP
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    getDataInitial();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handleMenuItemClick = (station) => {
    const selectedStation = stationCoordinates.find((s) => s.Station === station);
    setSelectedMarker(selectedStation);
    setSelectedStation(selectedStation);
    setMenuOpen(false);
  };

  function handleMarkerClick(marker) {
    setSelectedMarker(marker);
    setSelectedStation(marker.Station);
    // Filter data for the selected station.
    const dataForStation = data.filter(d => d.Device === marker.Id);
    console.log('dataForStation: ', dataForStation)
    console.log('marker: ', marker)
    // Find the minimum and maximum dates.
    const timeValues = dataForStation.map(obj => new Date(obj.Time).getTime());

    const minDateValue = new Date(Math.min(...timeValues));
    const maxDateValue = new Date(Math.max(...timeValues));
    console.log('minDateValue: ', minDateValue)
    console.log('maxDateValue: ', maxDateValue)
    // Set the dates.
    setStartDate(moment(minDateValue));
    setEndDate(moment(maxDateValue));
    // setMinDate(moment(minDateValue));
    // setMaxDate(moment(maxDateValue));
  }


  const navigate = useNavigate();
  const handleDeviceSubmit = async (event) => {
    event.preventDefault();
    navigate(`/deviceDeployment?latitude=${selectedMarker.Latitude}&longitude=${selectedMarker.Longitude}&project=${project[0].Id}`);
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
      <div>
        <Navbar />
        <Sidebar2 name="Dashboard" />
        <Grid item xs={9} sx={{ ml: 110, mt: 30 }}>
          <CircularProgress />
        </Grid>
      </div>
    )
  }

  //////////////////////////////////////////////////////

  console.log(data)

  //////////////////////////////////////////////////////


  return (
    <ThemeProvider theme={mdTheme}>

      <Navbar />
      <div style={{ display: "grid", gridTemplateColumns: "28vh auto" }}>
        <div><Sidebar2 name="Dashboard" /></div>
        <div style={{ marginLeft: 80 }}>
          <Grid container spacing={0} p={8} pt={2} sx={{
            backgroundColor: (theme) => theme.palette.grey[100]
          }}>

            <Grid item xs={11} ml={5}>

              {/**************************************/}
              {/*           Right big section        */}
              {/**************************************/}

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: 2 }}>
                <Typography variant="h5">{project[0].Name + ', ' + project[0].Location + ', ' + project[0].Country}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h5">{selectedMarker.Station}</Typography>
                  <IconButton onClick={handleMenuOpen}>
                    <ExpandMoreIcon sx={{ fontSize: '2rem' }} />
                  </IconButton>
                  <Button onClick={handleDeviceSubmit} variant="contained" color="primary">Add Device</Button>
                  <Link to={`/projectManagement/${project[0].Id}`}>
                    <Button variant="contained" color="primary">Edit Project</Button>
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
                            .filter((d) => d.Parameter === unit.ParameterName && d.Reading !== null && !isNaN(d.Reading));
                          return unitData.length > 0;
                        })
                        .slice(0, 2)
                        .map((unit, index) => {
                          const unitData = filteredData
                            .filter((d) => d.Parameter === unit.ParameterName && d.Reading !== null && !isNaN(d.Reading));
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
                      url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
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
                {units.length > 0 ? (
                  units
                    .filter((unit) => {
                      const unitData = filteredData
                        .filter((d) => d.Parameter === unit.ParameterName && d.Reading !== null && !isNaN(d.Reading));
                      return unitData.length > 0;
                    })
                    .slice(2)
                    .map((unit, index) => {
                      const unitData = filteredData
                        .filter((d) => d.Parameter === unit.ParameterName && d.Reading !== null && !isNaN(d.Reading));
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
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}


export default App;
