import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/side-bar.js";
import Navbar from "../navbar/navbar.js";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import "./addSensor.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// This is the validation schema. You can change it to change validation. Look up Yup documentation for more.
const validationSchema = Yup.object().shape({
  sensorName: Yup.string().required(),
  sensorType: Yup.string().required(),
  parameter: Yup.string().required(),
  min: Yup.number().required(),
  max: Yup.number().required(),
});

const AddSensor = () => {
  const [sensorTypes, setSensorTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/parameters");
      const data = await response.json();
      setSensorTypes(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "32vh auto",
        }}
      >
        <div>
          <Sidebar name="sensor" />
        </div>
        <div className="box">
          <div className="container">
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "20px",
                paddingTop: "10px",
              }}
            >
              Add New Sensor
            </h1>
            <Formik
              initialValues={{
                sensorName: "",
                sensorType: "",
                parameter: "",
                min: "",
                max: "",
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
                      error={Boolean(
                        touched.sensorName && errors.sensorName
                      )}
                      helperText={
                        touched.sensorName ? errors.sensorName : ""
                      }
                    />
                  </div>{" "}
                  <br />
                  <div>
                    <Field
                      as="select"
                      fullWidth
                      label="Parameter"
                      variant="standard"
                      name="parameter"
                      error={Boolean(
                        touched.parameter && errors.parameter
                      )}
                      helperText={
                        touched.parameter ? errors.parameter : ""
                      }
                    >
                      <option value="">Select a parameter</option>
                      {sensorTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.Name}
                        </option>
                      ))}
                    </Field>
                    <Button color="primary" size="small">
                      Add New Parameter?
                    </Button>
                  </div>{" "}
                  <br />
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Make/Model"
                      variant="standard"
                      name="type"
                      type="text"
                      error={Boolean(touched.sensorType && errors.sensorType)}
                      helperText={touched.sensorType ? errors.sensorType : ""}
                    />{" "}
                  </div>
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Minimum Value"
                      variant="standard"
                      name="min"
                      type="number"
                      error={Boolean(touched.min && errors.min)}
                      helperText={touched.min ? errors.min : ""}
                    />{" "}
                  </div>
                  <br />
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Maximum Value"
                      variant="standard"
                      name="max"
                      type="number"
                      error={Boolean(touched.max && errors.max)}
                      helperText={touched.max ? errors.max : ""}
                    />{" "}
                  </div>
                  <br />
                  <div className="button">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Add Sensor
                    </Button>
                   
                  </div>
                </Form>
              )}
            </Formik>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSensor;
