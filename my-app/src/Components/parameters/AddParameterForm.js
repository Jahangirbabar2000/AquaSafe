import React from "react";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./addParameter.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";

const validationSchema = Yup.object().shape({
  ParameterName: Yup.string().required(),
  ParameterMin: Yup.number().required(),
  ParameterMax: Yup.number().required(),
  ParameterUnit: Yup.string().required(),
  ParameterDescription: Yup.string().required()
});

const AddParameter = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ParameterName: "",
      ParameterMin: "",
      ParameterMax: "",
      ParameterUnit: "",
      ParameterDescription: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`http://localhost:8080/parameters/`, {
          ParameterName: values.ParameterName,
          ParameterMin: values.ParameterMin,
          ParameterMax: values.ParameterMax,
          ParameterUnit: values.ParameterUnit,
          ParameterDescription: values.ParameterDescription
        });
        navigate("/parameters");
      } catch (err) {
        console.error(err);
      }
    }
  });

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
            <Typography
              variant="h5"
              style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Add New Parameter
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <br />
              <br />
              <div>
                <TextField
                  fullWidth
                  label="Parameter Name"
                  variant="standard"
                  name="ParameterName"
                  type="text"
                  value={formik.values.ParameterName}
                  onChange={formik.handleChange}
                  error={formik.touched.ParameterName && Boolean(formik.errors.ParameterName)}
                  helperText={formik.touched.ParameterName && formik.errors.ParameterName}
                />
              </div>
              <br />
              <div>
                <TextField
                  fullWidth
                  label="Minimum Value"
                  variant="standard"
                  name="ParameterMin"
                  type="number"
                  value={formik.values.ParameterMin}
                  onChange={formik.handleChange}
                  error={formik.touched.ParameterMin && Boolean(formik.errors.ParameterMin)}
                  helperText={formik.touched.ParameterMin && formik.errors.ParameterMin}
                />
              </div>
              <br />
              <div>
                <TextField
                  fullWidth
                  label="Maximum Value"
                  variant="standard"
                  name="ParameterMax"
                  type="number"
                  value={formik.values.ParameterMax}
                  onChange={formik.handleChange}
                  error={formik.touched.ParameterMax && Boolean(formik.errors.ParameterMax)}
                  helperText={formik.touched.ParameterMax && formik.errors.ParameterMax}
                />
              </div>
              <br />
              <div>
                <TextField
                  fullWidth
                  label="Parameter Unit"
                  variant="standard"
                  name="ParameterUnit"
                  type="text"
                  value={formik.values.ParameterUnit}
                  onChange={formik.handleChange}
                  error={formik.touched.ParameterUnit && Boolean(formik.errors.ParameterUnit)}
                  helperText={formik.touched.ParameterUnit &&
                    formik.errors.ParameterUnit}
                />
              </div>
              <br />
              <div>
                <TextField
                  fullWidth
                  label="Parameter Description"
                  variant="standard"
                  name="ParameterDescription"
                  type="text"
                  value={formik.values.ParameterDescription}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ParameterDescription &&
                    Boolean(formik.errors.ParameterDescription)
                  }
                  helperText={
                    formik.touched.ParameterDescription &&
                    formik.errors.ParameterDescription
                  }
                />
              </div>
              <br />
              <br />
              <Button variant="contained" type="submit" fullWidth>
                Add Parameter
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParameter;