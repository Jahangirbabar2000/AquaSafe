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
  const [data, setData] = React.useState([]);
  const [units, setUnits] = React.useState([]);
  const [selectedStation, setSelectedStation] = React.useState("IN3");
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [stationCoordinates, setStationCoordinates] = React.useState([]); //Data of stations for the drop down menu

  //////////////////////////////////////////////////////////////
  const [loading, setLoading] = React.useState(true);
  const [startDate, setStartDate] = React.useState(moment('2014-08-10T21:11:54'));
  const [endDate, setEndDate] = React.useState(moment('2018-08-20T21:11:54'));
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
    setMenuOpen(true);
  };



  const getDataNew = () => {
    axios.get(`http://localhost:8080/api/dashboard/${projectId}`)
      .then(response => {

        const { project, deployedDevices, readings, units } = response.data;
        const dateOnlyReadings = readings.map(obj => {
          const dateOnlyString = new Date(obj.Time).toISOString().slice(0, 10);
          return { ...obj, Dates: dateOnlyString };
        });
        setData(dateOnlyReadings);
        setLoading(false);
        setUnits(units)
        setProject(project)
        // Extract latitude and longitude information from the deployedDevices array
        const stationCoordinatess = deployedDevices.map(device => {
          return {
            Id: device.Id,
            Station: device.Name,
            Latitude: device.Latitude,
            Longitude: device.Longitude
          };
        });
        setStationCoordinates(stationCoordinatess);
        setSelectedMarker(stationCoordinatess[0])
        setSelectedStation(stationCoordinatess[0])
      })
      .catch(error => console.log(error));
  }


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

    getDataNew();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuItemClick = (station) => {
    setSelectedStation(station); // Update selected station state
    setMenuOpen(false); // Close the menu
  };

  function handleMarkerClick(marker) {
    setSelectedMarker(marker);
    setSelectedStation(marker.Station);
  }

  const navigate = useNavigate();
  const handleDeviceSubmit = async (event) => {
    event.preventDefault();
    navigate(`/deviceDeployment?latitude=${selectedMarker.Latitude}&longitude=${selectedMarker.Longitude}&project=${21}`);
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

  console.log(units)

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
                  <Typography variant="h5">Device: {selectedMarker.Station}</Typography>
                  <IconButton onClick={handleMenuOpen}>
                    <ExpandMoreIcon sx={{ fontSize: '2rem' }} />
                  </IconButton>
                  <Button onClick={handleDeviceSubmit} variant="contained" color="primary">Add Device</Button>
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
                    TOP PARAMETERS
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
                <Grid container justifyContent="space-around">
                  {averages.map(average => {
                    const unit = units.find(unit => unit.ParameterName === average.ParameterName);
                    let color = "#de4545";
                    if (average.average !== null && average.average >= unit.Min && average.average <= unit.Max) {
                      color = "#83b854";
                    }
                    return (
                      <Parameters
                        key={unit.ParameterName}
                        color={color}
                        parameterName={unit.ParameterName}
                        value={`${average.average !== null ? average.average.toFixed(2) : 'N/A'} ${unit.Unit}`}
                      />
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
                      endDate={endDate} setEndDate={setEndDate} />
                    <Button variant="contained" onClick={getDataNew} size="large"
                      sx={{ ml: 4, mt: 1 }}>View </Button>
                  </Paper>


                  {/**************************************/}
                  {/*               2 GRAPHS             */}
                  {/**************************************/}

                  <Grid item>
                    <Paper sx={{ pl: 3, pr: 5 }}>
                      <Typography sx={{ pt: 1 }} variant="h5" >pH</Typography>
                      <Typography sx={{ pt: 1 }} variant="body1" >(Scale 0-14)</Typography>
                      <ResponsiveContainer height={140}>
                        <BarGraph data={filteredData} datakey={'pH'} min={'6.5'} max={'8.5'} />
                      </ResponsiveContainer>
                    </Paper>

                    <Paper sx={{ pl: 3, pr: 5, pt: 2, mt: 2 }}>
                      <Typography sx={{ pt: 1 }} variant="h5" >Dissolved Oxygen</Typography>
                      <Typography sx={{ pt: 1 }} variant="body1" >(mg/L)</Typography>
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
                    center={selectedMarker ? [selectedMarker.Latitude, selectedMarker.Longitude] : [22.449919, 114.163583]}
                    zoom={15}
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
                {units.map((unit, index) => (
                  <Paper key={unit.ParameterName} sx={{ pl: 3, pr: 5, pt: 2, mt: 2 }}>
                    <Typography sx={{ pt: 1 }} variant="h5">{unit.ParameterName}</Typography>
                    <Typography sx={{ pt: 1 }} variant="body1">({unit.Unit})</Typography>
                    <ResponsiveContainer height={140}>
                      {(index % 2 === 0) ? (
                        <BarGraph
                          data={filteredData
                            .filter((d) => d.Parameter === unit.ParameterName)
                            .map((d) => ({ ...d }))
                          }
                          datakey={'Reading'}
                          min={unit.Min}
                          max={unit.Max}
                        />
                      ) : (
                        <LineGraph
                          data={filteredData
                            .filter((d) => d.Parameter === unit.ParameterName)
                            .map((d) => ({ ...d }))
                          }
                          datakey={'Reading'}
                          min={unit.Min}
                          max={unit.Max}
                        />
                      )}
                    </ResponsiveContainer>
                  </Paper>
                ))}
              </Grid>



            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}


export default App;
