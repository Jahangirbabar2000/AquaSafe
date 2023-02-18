import React, { useState } from "react";
import Sidebar from "../sidebar/side-bar.js";
import Navbar from "../navbar/navbar.js";
import {
  Formik,
  Form,
  useField,
  useFormikContext,
  withFormik,
  Field
} from "formik";
import * as Yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import "./addSensor.css";
import Button from "@mui/material/Button";


// This is the validation schema. You can change it to change validation. Look up Yup documentation for more.
const validationSchema = Yup.object().shape({
  sensorName: Yup.string().required(),
  sensorType: Yup.string().required(),
  sensorUnit: Yup.string().required(),
  min: Yup.number().required(),
  max: Yup.number().required()
});


const AddSensor = () => (
  <div>
    <Navbar />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "32vh auto"
        // gridGap: "2px"
      }}
    >
      <div>
        <Sidebar name="sensor"/>
      </div>
      <div className="box">
        <div className="container">
          <h1
            style={{
              textAlign: "center",
              paddingBottom: "20px",
              paddingTop: "10px"
            }}
          >
            Add New Sensor
          </h1>
          <Formik
            initialValues={{
              sensorName: "",
              sensorType: "",
              unit: "",
              min: "",
              max: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {({ errors, touched }) => (
              <Form className="">
                <br />
                <div>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Sensor Name"
                    style={{ fontSize: "30px" }}
                    name="sensorName"
                    type="text"
                    error={Boolean(touched.sensorName && errors.sensorName)}
                    helperText={touched.sensorName ? errors.sensorName : ""}
                  />
                </div>{" "}
                <br />
                <div>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Sensor Type"
                    variant="standard"
                    multiline
                    name="sensorType"
                    type="text"
                    error={Boolean(touched.sensorType && errors.sensorType)}
                    helperText={touched.sensorType ? errors.sensorType : ""}
                  />
                </div>{" "}
                <br />
                <div>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Sensor Unit"
                    variant="standard"
                    name="unit"
                    type="text"
                    error={Boolean(touched.unit && errors.unit)}
                    helperText={touched.unit ? errors.unit : ""}
                  />{" "}
                </div>
                <br />
                <div>
                  <Field
                    name="min"
                    type="number"
                    as={TextField}
                    fullWidth
                    label="Minimum Value"
                    variant="standard"
                    error={Boolean(touched.min && errors.min)}
                    helperText={touched.min ? errors.min : "Enter a number"}
                  />
                </div>
                <br />
                <div>
                  <Field
                    name="max"
                    type="number"
                    as={TextField}
                    fullWidth
                    label="Maximum Value"
                    variant="standard"
                    error={Boolean(touched.max && errors.max)}
                    helperText={touched.max ? errors.max : "Enter a number"}
                  />
                </div>
                <br />
                <br />
                <Button fullWidth variant="contained" type="submit">
                  Add Sensor
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </div>
);

export default AddSensor;
