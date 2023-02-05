import React, { useState } from "react";
import "./device-deploy.css";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
// import Button from "@mui/material/Button";
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
  return (
    <div className="grid-container">
      <div className="left">
        <div className="container">
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
              {/* <div style={{display: "flex"}}> */}
              <TextField
                name="frequency"
                label="Frequency"
                helperText="Choose frequency of receving data"
              />
              <Select name="timeUnit" label="Unit" options={checkboxOptions} />
              {/* </div> */}
              <Button>Add Device</Button>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="right">
        <h1>Add leaflet map here</h1>
      </div>
    </div>
  );
};

export default DeviceDeployment;
