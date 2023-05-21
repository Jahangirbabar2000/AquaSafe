import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Chip } from "@mui/material";
import Parameter from "./parameter";
import Navbar from "../navbar/navbar";
import Sidebar2 from "../sidebar/Sidebar2";
import axios from "axios";
import { Box } from '@mui/system';
const WaterQualityPage = () => {
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("/parameters")
      .then((response) => setParameters(response.data))
      .catch((error) => console.log(error));
  }, []);

  const renderParameters = () => {
    const uniqueParameters = [];
    parameters.forEach((parameter) => {
      const existingParameter = uniqueParameters.find(
        (p) => p.Name === parameter.Name
      );
      if (!existingParameter) {
        uniqueParameters.push(parameter);
      }
    });

    return uniqueParameters.map((parameter) => (
      <Parameter
        key={parameter.Name}
        title={parameter.Name}
        description={parameter.Description}
        units={getUnitsForParameter(parameter.Name)}
      />
    ));
  };

  const getUnitsForParameter = (parameterName) => {
    const units = parameters
      .filter((parameter) => parameter.Name === parameterName)
      .map((parameter) => parameter.Unit);
    return [...new Set(units)];
  };

  return (  
      <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200], minHeight: '100vh' }}>
        <Navbar />
        <Sidebar2 name="Parameters" />
        <Container sx={{ ml: "43vh", mt: "25px", pb: "50px" }}>
          <Typography variant="h4" sx={{ mb: 3 }} align="center">
            Water Quality Parameters
          </Typography>
          <Grid container spacing={6} rowSpacing={10}>
            {renderParameters()}
          </Grid>
        </Container>
      </Box>    
  );
};

export default WaterQualityPage;
