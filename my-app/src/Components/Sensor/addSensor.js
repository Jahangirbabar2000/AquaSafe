import React, { useState, useEffect } from "react";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import "./addSensor.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// This is the validation schema. You can change it to change validation. Look up Yup documentation for more.
const validationSchema = Yup.object().shape({
  Model: Yup.string().required(),
  Parameter: Yup.string().required(),
  SensorMin: Yup.number().required(),
  SensorMax: Yup.number().required(),
});

const AddSensor = () => {
  const [waterParameters, setWaterParameters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/parameters");
      const data = await response.json();
      setWaterParameters(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      await axios.post(`http://localhost:8080/sensors/`, {
        Parameter: values.Parameter,
        Model: values.Model,
        SensorMin: values.SensorMin,
        SensorMax: values.SensorMax,
      });
      navigate("/sensors");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28vh auto"
        }}
      >
        <div>
          <Sidebar2 name="Sensors" />
        </div>
        <div className="box">
          <div className="containerrr">
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
                sensorType: "",
                parameter: "",
                SensorMin: "",
                SensorMax: ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                handleSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="">
                  <br />
                  <br />
                  <div>
                    <Field
                      as="select"
                      fullWidth
                      label="Parameter"
                      variant="standard"
                      name="Parameter"
                      error={Boolean(touched.Parameter && errors.Parameter)}
                      helperText={touched.Parameter ? errors.Parameter : ""}
                    >
                      <option value="">Select a parameter</option>
                      {waterParameters.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.Name}
                        </option>
                      ))}
                    </Field>
                    <Link to="/addParameter">
                      <Button color="primary" size="small">
                        Add New Parameter?
                      </Button>
                    </Link>
                  </div>{" "}
                  <br />
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Make/Model"
                      variant="standard"
                      name="Model"
                      type="text"
                      error={Boolean(touched.Model && errors.Model)}
                      helperText={touched.Model ? errors.Model : ""}
                    />{" "}
                  </div>
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Minimum Value"
                      variant="standard"
                      name="SensorMin"
                      type="number"
                      error={Boolean(touched.SensorMin && errors.SensorMin)}
                      helperText={touched.SensorMin ? errors.SensorMin : ""}
                    />{" "}
                  </div>
                  <br />
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Maximum Value"
                      variant="standard"
                      name="SensorMax"
                      type="number"
                      error={Boolean(touched.SensorMax && errors.SensorMax)}
                      helperText={touched.SensorMax ? errors.SensorMax : ""}
                    />{" "}
                  </div>
                  <br />
                  <div>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="normal"
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
