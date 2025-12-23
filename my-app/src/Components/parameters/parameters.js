import React, { useEffect, useState, useMemo } from "react";
import { Container, Typography, Grid } from "@mui/material";
import MainLayout from "../Layout/MainLayout";
import Parameter from "./parameter";
import { parametersAPI } from "../../services/api";

/**
 * WaterQualityPage - Displays all water quality parameters with their descriptions and units
 */
const WaterQualityPage = () => {
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await parametersAPI.getAll();
        setParameters(response.data);
      } catch (error) {
        console.error("Error fetching parameters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParameters();
  }, []);

  // Get unique parameters
  const uniqueParameters = useMemo(() => {
    const seen = new Set();
    return parameters.filter((param) => {
      if (seen.has(param.Name)) {
        return false;
      }
      seen.add(param.Name);
      return true;
    });
  }, [parameters]);

  // Get units for a specific parameter
  const getUnitsForParameter = (parameterName) => {
    return [
      ...new Set(
        parameters
          .filter((param) => param.Name === parameterName)
          .map((param) => param.Unit)
      ),
    ];
  };

  if (loading) {
    return (
      <MainLayout sidebarName="Parameters">
        <Typography variant="h4" sx={{ mb: 3 }} align="center">
          Loading parameters...
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout sidebarName="Parameters">
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Typography variant="h4" sx={{ mb: 4 }} align="center">
          Water Quality Parameters
        </Typography>
        <Grid container spacing={{ xs: 3, md: 4, lg: 6 }}>
          {uniqueParameters.map((parameter) => (
            <Grid item xs={12} sm={6} md={4} key={parameter.Name}>
              <Parameter
                title={parameter.Name}
                description={parameter.Description}
                units={getUnitsForParameter(parameter.Name)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default WaterQualityPage;
