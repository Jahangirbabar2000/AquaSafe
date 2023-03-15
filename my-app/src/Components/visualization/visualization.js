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
        const dateOnlyArray = response.data.map(obj => {
          const dateOnlyString = new Date(obj.Dates).toISOString().slice(0, 10);
          return { ...obj, Dates: dateOnlyString };
        });
        setData(dateOnlyArray);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  const getData = () => {
    const sd = moment(startDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');
    const ed = moment(endDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');
    axios.get(`http://localhost:8080/hkdata2?start_date=${sd}&end_date=${ed}`)
      .then(response => {
        const dateOnlyArray = response.data.map(obj => {
          const dateOnlyString = new Date(obj.Dates).toISOString().slice(0, 10);
          return { ...obj, Dates: dateOnlyString };
        });
        setData(dateOnlyArray);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  if (loading) {
    return <div>
      <Navbar />
      <Sidebar name="dashboard" />
      <Grid item xs={9} sx={{ ml: 25, mt: 10 }}>
        <h1>Loading...</h1>
      </Grid>

    </div>;
  }





  return (
    <ThemeProvider theme={mdTheme}>
      <Navbar />
      <Sidebar name="dashboard" />
      <Grid container spacing={0} p={8} pt={2} sx={{
        backgroundColor: (theme) => theme.palette.grey[100]
      }}>
        <Grid item xs={9} sx={{ ml: 40 }}>
          {/* Right big section*/}

          <Paper
            sx={{
              p: 2
            }}
          >
            <Link to="/WaterQualityPage" className="unstyled-link">
              <h3>TOP PARAMETERS</h3>
            </Link>

            <Grid container justifyContent="space-around" sm={12} >
              {/* PARAMETERS */}

              <Parameters color={data[6]["Water Temperature (°C)"] >= 4 &&
                data[6]["Water Temperature (°C)"] <= 22 ? '#83b854' : '#de4545'}
                parameterName="Temperature" value={data[6]["Water Temperature (°C)"] + " °C"} />
              <Parameters color={data[6]["pH"] >= 6.5 &&
                data[6]["pH"] <= 8.5 ? '#83b854' : '#de4545'}
                parameterName="pH" value={data[6]["pH"]} />

              <Parameters color={data[6]["Dissolved Oxygen (mg/L)"] >= 5 &&
                data[6]["Dissolved Oxygen (mg/L)"] <= 11 ? '#83b854' : '#de4545'}
                parameterName="Dissolved Oxygen" value={data[6]["Dissolved Oxygen (mg/L)"] + " mg/L"} />

              <Parameters color={data[6]["Conductivity (µS/cm)"] >= 100 &&
                data[6]["Conductivity (µS/cm)"] <= 1000 ? '#83b854' : '#de4545'}
                parameterName="Conductivity" value={data[6]["Conductivity (µS/cm)"] + " µS/cm"} />

              <Parameters color={data[6]["Nitrite-Nitrogen (mg/L)"] >= 0 &&
                data[6]["Nitrite-Nitrogen (mg/L)"] <= 1 ? '#83b854' : '#de4545'}
                parameterName="Nitrite-Nitrogen" value={data[6]["Nitrite-Nitrogen (mg/L)"] + "mg/L"} />

              <Parameters color={data[6]["5-Day Biochemical Oxygen Demand (mg/L)"] >= 1 &&
                data[6]["5-Day Biochemical Oxygen Demand (mg/L)"] <= 5 ? '#83b854' : '#de4545'}
                parameterName="BOD5" value={data[6]["5-Day Biochemical Oxygen Demand (mg/L)"] + " mg/L"} />

              <Parameters color={data[6]["Total Phosphorus (mg/L)"] >= 0 &&
                data[6]["Total Phosphorus (mg/L)"] <= 3 ? '#83b854' : '#de4545'}
                parameterName="Total Phosphorus" value={data[6]["Total Phosphorus (mg/L)"] + "mg/L"} />

              <Parameters color={data[6]["Ammonia-Nitrogen (mg/L)"] >= 0.25 &&
                data[6]["Ammonia-Nitrogen (mg/L)"] <= 20 ? '#83b854' : '#de4545'}
                parameterName="Ammonia-Nitrogen" value={data[6]["Ammonia-Nitrogen (mg/L)"] + " mg/L"} />

            </Grid>
          </Paper>
          <Paper sx={{
            p: 2,
            mt: 2,
            mb: 2,
            mr: 47
          }}
          >
            <Datepicker startDate={startDate} setStartDate={setStartDate}
              endDate={endDate} setEndDate={setEndDate} />
            <Button variant="contained" onClick={getData} size="large"
              sx={{ ml: 4, mt: 1 }}>View </Button>
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
                  <BarGraph data={data} datakey={'pH'} min={'6.5'} max={'8.5'} />
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
                  <LineGraph data={data} datakey={'Dissolved Oxygen (mg/L)'} min={'5'} max={'11'} />
                </ResponsiveContainer>
              </Paper>



            </Grid>
            <Grid item sm={5} alignItems="flex=end" justifyContent="flex=end" sx={{ mt: 4 }} >
              {/* MAP*/}

              <MapContainer
                center={[22.449300, 114.162233]}
                zoom={17}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[22.449300, 114.162233]}>
                  <Popup>
                    Location of this Device: <br /> North corner
                  </Popup>
                </Marker>
              </MapContainer>
              <Box container pl={20} pt={3}>
              </Box>
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
              <BarGraph data={data} datakey={'Ammonia-Nitrogen (mg/L)'} min={'0.25'} max={'3'} />
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
              <LineGraph data={data} datakey={'Total Phosphorus (mg/L)'} min={'0'} max={'3'} />
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
              <BarGraph data={data} datakey={'5-Day Biochemical Oxygen Demand (mg/L)'} min={'1'} max={'5'} />
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
              <LineGraph data={data} datakey={'Water Temperature (°C)'} min={'4'} max={'22'} />
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
              <BarGraph data={data} datakey={'Suspended solids (mg/L)'} min={'1'} max={'5'} />
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
              <LineGraph data={data} datakey={'Conductivity (µS/cm)'} min={'100'} max={'1000'} />
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
              <BarGraph data={data} datakey={'Nitrate-Nitrogen (mg/L)'} min={'0'} max={'10'} />
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
              <LineGraph data={data} datakey={'Nitrite-Nitrogen (mg/L)'} min={'0'} max={'1'} />
            </ResponsiveContainer>
          </Paper>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
