import * as React from "react";
import Grid from "@mui/material/Grid";
import moment from 'moment';
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
import Sidebar from "../sidebar/side-bar";
import Sidebar2 from "../sidebar/Sidebar2";
import { Paper, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import Datepicker from "./datepicker";
import Button from '@mui/material/Button';
import { Icon } from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const mdTheme = createTheme();


function App(props) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [startDate, setStartDate] = React.useState(moment('2014-08-10T21:11:54'));
  const [endDate, setEndDate] = React.useState(moment('2018-08-20T21:11:54'));
  const [selectedStation, setSelectedStation] = React.useState("IN3");
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [stationCoordinates, setStationCoordinates] = React.useState([]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuItemClick = (station) => {
    setSelectedStation(station); // Update selected station state
    setMenuOpen(false); // Close the menu
  };


  const handleMarkerClick = (marker) => {

    setSelectedMarker(marker);
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

  ////////////////////////////////////////////

  React.useEffect(() => {
    // CODE FOR FIXING MARKER PROBLEM ON MAP
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    // FIRST API REQUEST - Data
    axios.get(`http://localhost:8080/hkdata`)
      .then(response => {
        const dateOnlyArray = response.data.map(obj => {
          const dateOnlyString = new Date(obj.Dates).toISOString().slice(0, 10);
          return { ...obj, Dates: dateOnlyString };
        });
        setData(dateOnlyArray);
        setLoading(false);
      })
      .catch(error => console.log(error));

    // SECOND API REQUEST - Station Coordinates
    axios.get("http://localhost:8080/stationCoordinates")
      .then((response) => {

        setStationCoordinates(response.data);
        console.log(stationCoordinates);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getData = () => {
    const sd = moment(startDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');
    const ed = moment(endDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');
    axios.get(`http://localhost:8080/hkdata2?start_date=${sd}&end_date=${ed}`)
      .then(response => {
        console.log(data)
        const dateOnlyArray = response.data.map(obj => {
          const dateOnlyString = new Date(obj.Dates).toISOString().slice(0, 10);
          return { ...obj, Dates: dateOnlyString };
        });
        setData(dateOnlyArray);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  const stationNames = [...new Set(data.map((item) => item.Station))]; // Get distinct station names from data
  const filteredData = data.filter((d) => d.Station === selectedStation);
  // Calculate the average value for each parameter

  if (filteredData && filteredData.length > 0) {
    const averages = Object.keys(filteredData[0]).reduce((acc, key) => {
      if (key !== 'Station') {
        const sum = filteredData.reduce((total, d) => total + d[key], 0);
        const average = sum / filteredData.length;
        acc[key] = Number(average.toFixed(1)); // round to 1 decimal place
      }
      return acc;
    }, {});

    if (loading) {
      return <div>
        <Navbar />
        <Sidebar name="dashboard" />
        <Grid item xs={9} sx={{ ml: 100, mt: 10 }}>
          <h1>Loading...</h1>
        </Grid>

      </div>;
    }


    return (
      <ThemeProvider theme={mdTheme}>
  
        <Navbar />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "28vh auto"
          }}
        >
          <div>
            <Sidebar2 name="Readings" />
          </div>
          <div style={{ marginLeft: 80 }}>
            <Grid container spacing={0} p={8} pt={2} sx={{
              backgroundColor: (theme) => theme.palette.grey[100]
            }}>
              <Grid item xs={9} sx={{ ml: 40 }}>
                {/* Right big section*/}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: 2 }}>
                  <Typography variant="h3" sx={{ fontSize: '2.5rem' }}>Site: Lam Tsuen River</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Typography variant="h3" sx={{ fontSize: '2.5rem' }}>Station: {selectedStation}</Typography>
                    <IconButton onClick={handleMenuOpen}>
                      <ExpandMoreIcon sx={{ fontSize: '2.7rem' }} />
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={menuAnchor}
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    PaperProps={{
                      sx: {
                        '& .MuiMenuItem-root': {
                          fontSize: '1.2rem',
                          padding: '10px 20px',
                        },
                        '& .Mui-selected': {
                          backgroundColor: '#f0f0f0',
                        },
                        '& .MuiMenu-list': {
                          minWidth: '170px',
                          maxHeight: '400px', // Set maximum height here
                          overflow: 'auto', // Enable scrolling when content exceeds maxHeight
                        },
                      },
                    }}
                  >
                    {stationNames.map((name) => (
                      <MenuItem key={name} onClick={() => {
                        setMenuOpen(false);
                        handleMenuItemClick(name);
                      }} selected={selectedStation === name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>


                <Paper
                  sx={{
                    p: 2
                  }}
                >

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" display="inline">
                      TOP PARAMETERS
                    </Typography>
                    <Link to="/WaterQualityPage" className="unstyled-link">
                      <IconButton aria-label="help" sx={{ display: 'flex', alignItems: 'center' }}>
                        <HelpOutline sx={{ fontSize: '1.8rem' }} />
                      </IconButton>
                    </Link>
                  </Box>





                  <Grid container justifyContent="space-around" sm={12} >

                    {/**************************************/}
                    {/*            TOP PARAMETERS          */}
                    {/**************************************/}


                    <Parameters
                      color={averages["Water Temperature (°C)"] >= 4 && averages["Water Temperature (°C)"] <= 22 ? '#83b854' : '#de4545'}
                      parameterName="Temperature" value={averages["Water Temperature (°C)"] + " °C"}
                    />
                    <Parameters
                      color={averages["pH"] >= 6.5 && averages["pH"] <= 8.5 ? '#83b854' : '#de4545'}
                      parameterName="pH" value={averages["pH"]}
                    />
                    <Parameters
                      color={averages["Dissolved Oxygen (mg/L)"] >= 5 && averages["Dissolved Oxygen (mg/L)"] <= 11 ? '#83b854' : '#de4545'}
                      parameterName="Dissolved Oxygen" value={averages["Dissolved Oxygen (mg/L)"] + " mg/L"}
                    />
                    <Parameters
                      color={averages["Conductivity (µS/cm)"] >= 100 && averages["Conductivity (µS/cm)"] <= 1000 ? '#83b854' : '#de4545'}
                      parameterName="Conductivity" value={averages["Conductivity (µS/cm)"] + " µS/cm"}
                    />
                    <Parameters
                      color={averages["Nitrite-Nitrogen (mg/L)"] >= 0 && averages["Nitrite-Nitrogen (mg/L)"] <= 1 ? '#83b854' : '#de4545'}
                      parameterName="Nitrite-Nitrogen" value={averages["Nitrite-Nitrogen (mg/L)"] + "mg/L"}
                    />
                    <Parameters
                      color={averages["5-Day Biochemical Oxygen Demand (mg/L)"] >= 1 && averages["5-Day Biochemical Oxygen Demand (mg/L)"] <= 5 ? '#83b854' : '#de4545'}
                      parameterName="BOD5" value={averages["5-Day Biochemical Oxygen Demand (mg/L)"] + " mg/L"}
                    />
                    <Parameters
                      color={averages["Total Phosphorus (mg/L)"] >= 0 && averages["Total Phosphorus (mg/L)"] <= 3 ? '#83b854' : '#de4545'}
                      parameterName="Total Phosphorus" value={averages["Total Phosphorus (mg/L)"] + "mg/L"}
                    />
                    <Parameters
                      color={averages["Ammonia-Nitrogen (mg/L)"] >= 0.25 && averages["Ammonia-Nitrogen (mg/L)"] <= 20 ? '#83b854' : '#de4545'}
                      parameterName="Ammonia-Nitrogen" value={averages["Ammonia-Nitrogen (mg/L)"] + " mg/L"}
                    />

                  </Grid>
                </Paper>

                <Grid container>
                  <Grid item md={7}>

                    {/**************************************/}
                    {/*             DatePicker             */}
                    {/**************************************/}

                    <Paper sx={{
                      p: 2,
                      mt: 2,
                      mb: 2,
                      mr: 0
                    }}
                    >
                      <Datepicker startDate={startDate} setStartDate={setStartDate}
                        endDate={endDate} setEndDate={setEndDate} />
                      <Button variant="contained" onClick={getData} size="large"
                        sx={{ ml: 4, mt: 1 }}>View </Button>
                    </Paper>



                    <Grid item>

                      {/**************************************/}
                      {/*               2 GRAPHS             */}
                      {/**************************************/}

                      <Paper sx={{
                        pl: 3,
                        pr: 5,
                        pt: 2,
                        mt: 2
                      }}>
                        <h3>pH</h3>
                        <h5>(Scale 0-14)</h5>
                        <ResponsiveContainer height={140}>
                          <BarGraph data={filteredData} datakey={'pH'} min={'6.5'} max={'8.5'} />
                        </ResponsiveContainer>
                      </Paper>

                      <Paper sx={{
                        pl: 3,
                        pr: 5,
                        pt: 2,
                        mt: 2
                      }}>
                        <h3>Dissolved Oxygen</h3>
                        <h5>(mg/L)</h5>
                        <ResponsiveContainer height={140}>
                          <LineGraph data={filteredData} datakey={'Dissolved Oxygen (mg/L)'} min={'5'} max={'11'} />
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>

                  </Grid>

                  {/**************************************/}
                  {/*                MAP                 */}
                  {/**************************************/}

                  <Grid item sx={{ mt: 5 }} md={5} sm={5} alignItems="flex=end" justifyContent="flex=end">
                    <MapContainer
                      center={[22.449919, 114.163583]}
                      zoom={15}
                      scrollWheelZoom={true}
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
                            click: (event) => {
                              console.log('Marker clicked:', marker);
                              handleMarkerClick(marker);
                            },
                          }}
                        >
                          <Popup>{marker.Station}</Popup>
                        </Marker>
                      ))}

                    </MapContainer>


                    <Box container pl={20} pt={3}>
                    </Box>
                  </Grid>


                </Grid>


                {/**************************************/}
                {/*           Rest of charts           */}
                {/**************************************/}

                <Grid>
                  <Paper sx={{
                    pl: 3,
                    pr: 5,
                    pt: 2,
                    mt: 3
                  }}>
                    <h3>Ammonia-Nitrogen</h3>
                    <h5>(mg/L)</h5>
                    <ResponsiveContainer height={140}>
                      <BarGraph data={filteredData} datakey={'Ammonia-Nitrogen (mg/L)'} min={'0.25'} max={'3'} />
                    </ResponsiveContainer>
                  </Paper>

                  <Paper sx={{
                    pl: 3,
                    pr: 5,
                    pt: 2,
                    mt: 2
                  }}>
                    <h3>Total Phosphorus (mg/L)</h3>
                    <h5>(mg/L)</h5>
                    <ResponsiveContainer height={140}>
                      <LineGraph data={filteredData} datakey={'Total Phosphorus (mg/L)'} min={'0'} max={'3'} />
                    </ResponsiveContainer>
                  </Paper>

                  <Paper sx={{
                    pl: 3,
                    pr: 5,
                    pt: 2,
                    mt: 2
                  }}>
                    <h3>5-Day Biochemical Oxygen Demand</h3>
                    <h5>(mg/L)</h5>
                    <ResponsiveContainer height={140}>
                      <BarGraph data={filteredData} datakey={'5-Day Biochemical Oxygen Demand (mg/L)'} min={'1'} max={'5'} />
                    </ResponsiveContainer>
                  </Paper>

                  <Paper sx={{
                    pl: 3,
                    pr: 5,
                    pt: 2,
                    mt: 2
                  }}>
                    <h3>Water Temperature</h3>
                    <h5>(°C)</h5>
                    <ResponsiveContainer height={140}>
                      <LineGraph data={filteredData} datakey={'Water Temperature (°C)'} min={'4'} max={'22'} />
                    </ResponsiveContainer>
                  </Paper>

                  <Paper sx={{
                    pl: 3,
                    pr: 5,
                    pt: 2,
                    mt: 2
                  }}>
                    <h3>Suspended solids</h3>
                    <h5>(mg/L)</h5>
                    <ResponsiveContainer height={140}>
                      <BarGraph data={filteredData} datakey={'Suspended solids (mg/L)'} min={'1'} max={'5'} />
                    </ResponsiveContainer>
                  </Paper>

                  <Paper sx={{
                    pl: 3,
                    pr: 5,
                    pt: 2,
                    mt: 2
                  }}>
                    <h3>Conductivity</h3>
                    <h5>(µS/cm)</h5>
                    <ResponsiveContainer height={140}>
                      <LineGraph data={filteredData} datakey={'Conductivity (µS/cm)'} min={'100'} max={'1000'} />
                    </ResponsiveContainer>
                  </Paper>

                  <Paper sx={{
                    pl: 3,
                    pr: 5,
                    pt: 2,
                    mt: 2
                  }}>
                    <h3>Nitrate-Nitrogen</h3>
                    <h5>(mg/L)</h5>
                    <ResponsiveContainer height={140}>
                      <BarGraph data={filteredData} datakey={'Nitrate-Nitrogen (mg/L)'} min={'0'} max={'10'} />
                    </ResponsiveContainer>
                  </Paper>

                  <Paper sx={{
                    pl: 3,
                    pr: 5,
                    pt: 2,
                    mt: 2
                  }}>
                    <h3>Nitrite-Nitrogen</h3>
                    <h5>(mg/L)</h5>
                    <ResponsiveContainer height={140}>
                      <LineGraph data={filteredData} datakey={'Nitrite-Nitrogen (mg/L)'} min={'0'} max={'1'} />
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>

      </ThemeProvider>
    ); 
  }
}

export default App;
