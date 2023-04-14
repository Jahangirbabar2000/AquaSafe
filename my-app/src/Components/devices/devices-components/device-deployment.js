import React, { useState } from "react";
import "./device-deploy.css";
import Sidebar from "../../sidebar/side-bar";
import Sidebar2 from "../../sidebar/Sidebar2";
import Navbar from "../../navbar/navbar";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import TextField from "./components-form/textfield.js";
import Select from "./components-form/select.js";
import Button from "./components-form/button.js";

const sensors = ["Temperature", "Turbidity", "pH", "PO4", "Conductivity"];
const CommunicationModes = ["GSM Module", "LoraWan"];

const INITIAL_FORM_STATES = {
  deviceID: "",
  description: "",
  location: "",
  DeviceNum: "",
  frequency: "",
  timeUnit: ""
};

// This is the validation schema. You can change it to change validation. Look up Yup documentation for more.
const FORM_VALIDATION = Yup.object().shape({
  deviceID: Yup.string().required("Enter a device ID"),
  description: Yup.string()
    .max(124)
    .required("description is required"),
  location: Yup.string()
    .required("Location is required")
    .max("100", "Location should not exceed 100"),
  deviceNum: Yup.number("Must be a number.").required("Enter a device number"),
  frequency: Yup.number().required("Enter a frequency"),
  timeUnit: Yup.string().required("Required")
});

const checkboxOptions = ["Minute", "Hour", "Day", "month"];
const DeviceDeployment = () => {
  // const checkboxes = [
  //   { id: 1, label: 'Checkbox 1' },
  //   { id: 2, label: 'Checkbox 2' },
  //   { id: 3, label: 'Checkbox 3' },
  //   { id: 4, label: 'Checkbox 4' },
  //   { id: 5, label: 'Checkbox 5' }
  // ];
  // const [checkedItems, setCheckedItems] = useState({});

  // const handleChange = (event) => {
  //   setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
  // }

  // const handleButtonClick = () => {
  //   const checkedValues = Object.entries(checkedItems)
  //     .filter(([name, checked]) => checked)
  //     .map(([name, checked]) => name);

  //   console.log('Checked values:', checkedValues);
  // }

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
                    ...INITIAL_FORM_STATES
                  }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={values => {
                    console.log(values);
                  }}
                >
                  <Form>
                    <TextField name="deviceID" label="Device ID" />
                    <TextField name="description" label="Description" />
                    <TextField name="location" label="Location" />
                    <TextField name="deviceNum" label="Device Number" />
                    <TextField
                      name="frequency"
                      label="Frequency"
                      helperText="Choose frequency of receving data"
                    />
                    <Select
                      name="timeUnit"
                      label="Unit"
                      options={checkboxOptions}
                    />
                    {/* </div> */}
                    <div style={{ height: 25 }}></div>
                    <Button sx={{ fontSize: 100 }}>Add Device</Button>
                  </Form>
                </Formik>
                {/* <h2>Select sensors</h2>
            <div>
              {checkboxes.map(item => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    name={item.label}
                    checked={checkedItems[item.label] || false}
                    onChange={handleChange}
                  />
                  {item.label}
                </label>
              ))}
              <br />
              <button onClick={handleButtonClick}>Show Checked Values</button>
            </div> */}
              </div>
            </div>
            <div className="map">
              <h2>Select location from map:</h2>
              <MapContainer
                className="deviceMap"
                center={[33.702299, 73.13]}
                zoom={14}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
               contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[33.702299, 73.130]}>
              <Popup>
                Location of this Project: <br /> Rawal Lake, Islamabad
              </Popup>
            </Marker> */}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDeployment;
