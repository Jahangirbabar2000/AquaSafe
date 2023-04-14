import React, { useState, useEffect } from "react";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import "./addParameter.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// This is the validation schema. You can change it to change validation. Look up Yup documentation for more.
const validationSchema = Yup.object().shape({
  ParameterName: Yup.string().required(),
  ParameterMin: Yup.string().required(),
  ParamterMax: Yup.number().required(),
  ParameterDetails: Yup.number().required()
});

const AddParameter = () => {
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

  const handleSubmit = async values => {
    try {
      await axios.post(`http://localhost:8080/sensors/`, {
        ParameterName: values.ParameterName,
        ParameterMin: values.ParameterMin,
        ParameterMax: values.ParameterMax,
        ParameterUnit: values.ParameterUnit,
        ParameterDetails: values.ParameterDetails
      });
      navigate("/parameters");
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
          <Sidebar2 name="Parameters" />
        </div>
        <div className="box">
          <div className="containerr">
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "20px",
                paddingTop: "10px"
              }}
            >
              Add New Parameter
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
                      as={TextField}
                      fullWidth
                      label="Parameter Name"
                      variant="standard"
                      name="ParameterName"
                      type="text"
                      error={Boolean(
                        touched.ParameterName && errors.ParameterName
                      )}
                      helperText={
                        touched.ParameterName ? errors.ParameterName : ""
                      }
                    />{" "}
                  </div>
                  <br />
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Minimum Value"
                      variant="standard"
                      name="ParameterMin"
                      type="number"
                      error={Boolean(
                        touched.ParameterMin && errors.ParameterMin
                      )}
                      helperText={
                        touched.ParameterMin ? errors.ParameterMin : ""
                      }
                    />{" "}
                  </div>
                  <br />
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Maximum Value"
                      variant="standard"
                      name="ParameterMax"
                      type="number"
                      error={Boolean(
                        touched.ParameterMax && errors.ParameterMax
                      )}
                      helperText={
                        touched.ParameterMax ? errors.ParameterMax : ""
                      }
                    />{" "}
                  </div>
                  <br />
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Parameter Unit"
                      variant="standard"
                      name="ParameterUnit"
                      type="text"
                      error={Boolean(
                        touched.ParameterUnit && errors.ParameterUnit
                      )}
                      helperText={
                        touched.ParameterUnit ? errors.ParameterUnit : ""
                      }
                    />{" "}
                  </div>
                  <br />
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Details"
                      variant="standard"
                      name="ParameterDetails"
                      type="text"
                      error={Boolean(
                        touched.ParameterDetails && errors.ParameterDetails
                      )}
                      helperText={
                        touched.ParameterDetails ? errors.ParameterDetails : ""
                      }
                    />{" "}
                  </div>
                  <br />
                  <div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Add Parameter
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

export default AddParameter;
