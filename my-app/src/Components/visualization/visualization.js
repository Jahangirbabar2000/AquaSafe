import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import moment from 'moment';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Parameters from "./ParamCard";
import LineGraph from "../graphs/LineChart";
import BarGraph from "../graphs/BarGraph";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ResponsiveContainer } from "recharts";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./visualization.css";
import { Link } from 'react-router-dom';
import Navbar from "../navbar/navbar.js";
import Sidebar from "../sidebar/side-bar";
import { Paper } from "@mui/material";
import Datepicker from "./datepicker";
import Button from '@mui/material/Button';


const mdTheme = createTheme();

function App(props) {
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 1000);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [startDate, setStartDate] = React.useState(moment('2017-08-10T21:11:54'));
  const [endDate, setEndDate] = React.useState(moment('2017-08-20T21:11:54'));

  React.useEffect(() => {
    // CODE FOR FIXING MARKER PROBLEM ON MAP
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    axios.get(`http://localhost:8080/hkdata`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  const getData = () => {
    const sd = moment(startDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');
    const ed = moment(endDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');
    axios.get(`http://localhost:8080/hkdata2?start_date=${sd}&end_date=${ed}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  if (loading) {
    return <div>
      <Navbar />
      <Sidebar />
      <Grid item xs={9} sx={{ ml: 25, mt: 10 }}>
        <h1>Loading...</h1>
      </Grid>

    </div>;
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Navbar />
      <Sidebar />
      <Grid container spacing={0} p={8} pt={2} sx={{
        backgroundColor: (theme) => theme.palette.grey[100]
      }}>
        <Grid item xs={9} sx={{ ml: 40 }}>
          {/* Right big section*/}


          <Paper sx={{
            p: 2,
            m: 2,
            mr: 40
          }}
          >
            <Datepicker startDate={startDate} setStartDate={setStartDate}
              endDate={endDate} setEndDate={setEndDate} />
            <Button variant="contained" onClick={getData} size="large"
              sx={{ ml: 4, mt: 1 }}>Submit</Button>
          </Paper>

          <Paper
            sx={{
              p: 2
            }}
          >

            <h3>TOP PARAMETERS</h3>
            <Grid container justifyContent="space-around" sm={12} >
              {/* PARAMETERS */}

              <Parameters color={data[6]["Water Temperature (°C)"] >= 4 &&
                data[6]["Water Temperature (°C)"] <= 22 ? '#7bb844' : '#DD3939'}
                parameterName="Temperature" value={data[6]["Water Temperature (°C)"] + " °C"} />

              <Parameters color={data[6]["pH"] >= 6.5 &&
                data[6]["pH"] <= 8.5 ? '#7bb844' : '#DD3939'}
                parameterName="pH" value={data[6]["pH"]} />

              <Parameters color={data[6]["Dissolved Oxygen (mg/L)"] >= 5 &&
                data[6]["Dissolved Oxygen (mg/L)"] <= 11 ? '#7bb844' : '#DD3939'}
                parameterName="Dissolved Oxygen" value={data[6]["Dissolved Oxygen (mg/L)"] + " mg/L"} />

              <Parameters color={data[6]["Conductivity (µS/cm)"] >= 100 &&
                data[6]["Conductivity (µS/cm)"] <= 1000 ? '#7bb844' : '#DD3939'}
                parameterName="Conductivity" value={data[6]["Conductivity (µS/cm)"] + " µS/cm"} />

              <Parameters color={data[6]["Nitrite-Nitrogen (mg/L)"] >= 0 &&
                data[6]["Nitrite-Nitrogen (mg/L)"] <= 1 ? '#7bb844' : '#DD3939'}
                parameterName="Nitrite-Nitrogen" value={data[6]["Nitrite-Nitrogen (mg/L)"] + "mg/L"} />

              <Parameters color={data[6]["5-Day Biochemical Oxygen Demand (mg/L)"] >= 1 &&
                data[6]["5-Day Biochemical Oxygen Demand (mg/L)"] <= 5 ? '#7bb844' : '#DD3939'}
                parameterName="BOD5" value={data[6]["5-Day Biochemical Oxygen Demand (mg/L)"] + " mg/L"} />

              <Parameters color={data[6]["Total Phosphorus (mg/L)"] >= 0 &&
                data[6]["Total Phosphorus (mg/L)"] <= 3 ? '#7bb844' : '#DD3939'}
                parameterName="Total Phosphorus" value={data[6]["Total Phosphorus (mg/L)"] + "mg/L"} />

              <Parameters color={data[6]["Ammonia-Nitrogen (mg/L)"] >= 0.25 &&
                data[6]["Ammonia-Nitrogen (mg/L)"] <= 20 ? '#7bb844' : '#DD3939'}
                parameterName="Ammonia-Nitrogen" value={data[6]["Ammonia-Nitrogen (mg/L)"] + " mg/L"} />

            </Grid>
          </Paper>



          <Grid container alignItems="center" spacing={2}>
            {/* GRAPHS and MAP*/}
            <Grid item sm={7}>
              {/* GRAPHS*/}
              <Paper sx={{
                pl: 3,
                pr: 5,
                pt: 2,
                mt: 2
              }}>
                <h3>pH</h3>
                <h5>(Scale 0-14)</h5>
                <ResponsiveContainer height={140}>
                  <BarGraph data={data} datakey={'pH'} />
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
                  <LineGraph data={data} datakey={'Dissolved Oxygen (mg/L)'} />
                </ResponsiveContainer>
              </Paper>



            </Grid>
            <Grid item sm={5} alignItems="flex=end" justifyContent="flex=end" sx={{ mt: 4 }} >
              {/* MAP*/}

              <MapContainer
                center={[33.711199, 73.13]}
                zoom={13}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[33.711199, 73.13]}>
                  <Popup>
                    Location of this Device: <br /> North corner
                  </Popup>
                </Marker>
              </MapContainer>
              {/* <Box container pl={32} pt={3}>
                <Link to="/sites">
                  <NewButton text={"Back"}>
                  </NewButton>
                </Link>
              </Box> */}
            </Grid>
          </Grid>

          <Paper sx={{
            pl: 3,
            pr: 5,
            pt: 2,
            mt: 3
          }}>
            <h3>Ammonia-Nitrogen</h3>
            <h5>(mg/L)</h5>
            <ResponsiveContainer height={140}>
              <BarGraph data={data} datakey={'Ammonia-Nitrogen (mg/L)'} />
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
              <LineGraph data={data} datakey={'Total Phosphorus (mg/L)'} />
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
              <BarGraph data={data} datakey={'5-Day Biochemical Oxygen Demand (mg/L)'} />
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
              <LineGraph data={data} datakey={'Water Temperature (°C)'} />
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
              <BarGraph data={data} datakey={'Suspended solids (mg/L)'} />
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
              <LineGraph data={data} datakey={'Conductivity (µS/cm)'} />
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
              <BarGraph data={data} datakey={'Nitrate-Nitrogen (mg/L)'} />
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
              <LineGraph data={data} datakey={'Nitrite-Nitrogen (mg/L)'} />
            </ResponsiveContainer>
          </Paper>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
