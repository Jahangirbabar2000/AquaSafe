import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import dummyData from "./dummyData/dummy.json";
import List from "./dummyData/List";
import Parameters from "./ParamCard";
import LineGraph from "./graphs/LineChart";
import BarGraph from "./graphs/BarGraph";
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
import Navbar from "./navbar/navbar.js";

function App(props) {
  setTimeout(function() {
    window.dispatchEvent(new Event("resize"));
  }, 1000);

  axios
    .get("http://localhost:8080/data")
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });

  React.useEffect(() => {
    // CODE FOR FIXING MARKER PROBLEM ON MAP
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  const [inputText, setInputText] = React.useState("");
  let inputHandler = e => {
    // CODE FOR IMPLEMENTATOIN OF SEARCH BAR
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const leafletContainerStyles = {
    marginLeft: "5vh",
    width: "50vh",
    height: "50vh"
  };

  return (
    <div>
      <Navbar />
      <Grid container spacing={2} p={12} pt={0} pb={5}>
        <Grid item xs={3}>
          {" "}
          {/* Left small section*/}
          <h2 className="projectName">Project Rawal Lake</h2>
          <div className="search">
            <TextField
              fullWidth
              className="inputRounded"
              onChange={inputHandler}
              id="input-with-icon-textfield"
              label="Search Device"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              variant="outlined"
            />
          </div>
          {/************ DEVICES ************/}
          <Box sx={{ paddingTop: 5, maxWidth: 220 }}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 200,
                border: "3px solid #30b1d9",
                borderRadius: "8px",
                ":hover": {
                  boxShadow: 20 // theme.shadows[20]
                }
              }}
            >
              <React.Fragment>
                <CardContent>
                  <h3 class="ul">Devices</h3>

                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper"
                    }}
                    input={inputText}
                  />
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
          {/************ VISUALIZTOIN ************/}
          <Box sx={{ paddingTop: 5, maxWidth: 220 }}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 200,
                border: "3px solid #30b1d9",
                borderRadius: "8px",
                ":hover": {
                  boxShadow: 20 // theme.shadows[20]
                }
              }}
            >
              <React.Fragment>
                <CardContent>
                  <h3 class="ul">Visualization</h3>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Box component="div" fontSize={17}>
                          Turbidity
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Box component="div" fontSize={17}>
                          pH
                        </Box>
                      }
                    />
                  </FormGroup>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={9}>
          {" "}
          {/* Right big section*/}
          <h3>TOP PARAMETERS</h3>
          <Grid container justifyContent="space-around" sm={12}>
            {" "}
            {/* PARAMETERS */}
            <Parameters parameterName="Temperature" value={28 + "°C"} />
            <Parameters
              parameterName="Conductivity"
              value={dummyData[1].Conductivity + " mS/cm"}
            />
            <Parameters
              parameterName="Turbidity(NTU)"
              value={dummyData[1].Turbidity}
            />
            <Parameters parameterName="TSS" value={20 + "mg/L"} />
            <Parameters parameterName="DO" value={8 + "mg/L"} />
            <Parameters parameterName="pH" value={dummyData[1].pH} />
            <Parameters parameterName="BOD5" value={7 + "mg/L"} />
            <Parameters parameterName="NO3-(N)" value={10 + "mg/L"} />
            <Parameters parameterName="PO4" value={0.03 + "mg/L"} />
            {/* <Parameters parameterName="NO2-N" value={dummyData[1].Turbidity + 'mg/L'} /> */}
            <Parameters parameterName="NH3-N" value={30 + "mg/L"} />
          </Grid>
          <Grid container alignItems="center" spacing={6}>
            {" "}
            {/* GRAPHS and MAP*/}
            <Grid item sm={7}>
              {" "}
              {/* GRAPHS*/}
              <h3>pH</h3>
              <h6>(Scale 0-14)</h6>
              <ResponsiveContainer height={160}>
                <BarGraph data={dummyData} />
              </ResponsiveContainer>
              <h3>Turbidity (NTU)</h3>
              <h6>(Nephelometric Turbidity Units)</h6>
              <ResponsiveContainer height={160}>
                <LineGraph data={dummyData} />
              </ResponsiveContainer>
            </Grid>
            <Grid item sm={5} alignItems="flex=end" justifyContent="flex=end">
              {" "}
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
