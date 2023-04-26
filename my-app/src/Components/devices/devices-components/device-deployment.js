import React, { useState, useEffect, useMemo } from "react";
import "./device-deploy.css";
import Sidebar2 from "../../sidebar/Sidebar2";
import Navbar from "../../navbar/navbar";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import TextField from "./components-form/textfield.js";
import Select from "./components-form/select.js";
import Button from "./components-form/button.js";
import axios from "axios";

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

const DeviceDeployment = () => {
  const [sensors, setSensors] = useState([]);
  const [markerPosition, setMarkerPosition] = useState([33.702299, 73.13]);

  function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    const newLat = parseFloat(lat.toFixed(6));
    const newLng = parseFloat(lng.toFixed(6));
    setMarkerPosition([newLat, newLng]);
  }

  useEffect(() => {
    const fetchSensors = async () => {
      const response = await axios.get("http://localhost:8080/parameters");
      setSensors(response.data);
    };
    fetchSensors();
  }, []);

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


  const map = useMemo(() => (
    <MapContainer
      className="deviceMap"
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
          // gridGap: "2px"
        }}
      >
        <div>
          <Sidebar2 name="Devices" />
        </div>
        <div>
          <div className="grid-container">
            <div className="containerrrr">
              <div className="card">
                <h2>General Device Details</h2>
                <Formik
                  initialValues={{
                    ...INITIAL_FORM_STATES,
                    sensors: sensors.map(sensor => sensor.name)
                  }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={values => {
                    console.log(values);
                  }}
                >
                  <Form>
                    <div style={{ display: "flex" }}>
                      <TextField
                        name="latitude"
                        label="Latitude"
                        value={markerPosition[0]}
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
                      <TextField name="frequency" label="Frequency" style={{ marginRight: "10px" }} />
                      <Select name="timeUnit" label="Unit" options={checkboxOptions} />
                    </div>

                    <div>
                      <h2>Sensors</h2>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {sensors.map(sensor => (
                          <label key={sensor.Name} style={{ display: "flex", alignItems: "center", margin: "5px", cursor: "pointer" }}>
                            <Field type="checkbox" name="sensors" value={sensor.Name} style={{ marginRight: "5px" }} />
                            <span style={{ fontSize: "16px" }}>{sensor.Name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={{ height: 25 }}></div>
                    <Button sx={{ fontSize: 100 }}>Add Device</Button>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="map">
              <h2>Select location from map:</h2>
              {map}
            </div>
          </div>
        </div>
      </div>
    </div>
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
