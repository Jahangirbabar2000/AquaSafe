import React from "react";
import MainLayout from "../Layout/MainLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./addParameter.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Box } from "@mui/material";
import { parametersAPI } from "../../services/api";

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
        await parametersAPI.create({
          ParameterName: values.ParameterName,
          ParameterMin: parseFloat(values.ParameterMin),
          ParameterMax: parseFloat(values.ParameterMax),
          ParameterUnit: values.ParameterUnit,
          ParameterDescription: values.ParameterDescription,
        });
        navigate("/parameters");
      } catch (error) {
        console.error("Error creating parameter:", error);
        alert(error.response?.data?.message || "Error creating parameter. Please try again.");
      }
    }
  });

  return (
    <MainLayout sidebarName="Parameters">
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "600px" },
          mx: "auto",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 2,
          p: { xs: 2, sm: 4 },
        }}
      >
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
      </Box>
    </MainLayout>
  );
};

export default AddParameter;