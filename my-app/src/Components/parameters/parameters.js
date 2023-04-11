import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import Parameter from "./parameter";
import Navbar from "../navbar/navbar";
import Sidebar2 from "../sidebar/Sidebar2";

const WaterQualityPage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar2 name="Dashboard" />
      <Container sx={{ ml: "260px", mt: "25px", pb: "50px" }}>
        <Typography variant="h4" sx={{ mb: 3 }} align="center">Water Quality Parameters</Typography>
        <Grid container spacing={2}>
          <Parameter title={"pH"} description={"pH is a measure of the acidity or alkalinity of a solution. pH values range from 0-14, with 7 being neutral. A pH of less than 7 is acidic, and a pH greater than 7 is basic. Maintaining a proper pH balance is important for the survival of aquatic life, as well as for drinking water quality. "} />
          <Parameter title={"Water Temperature"} description={"Water temperature is an important factor in determining the health of a body of water. It affects the solubility of oxygen, the rate of photosynthesis, and the metabolism of aquatic organisms. Additionally, some species of fish and other aquatic life have specific temperature ranges that they require for survival and reproduction."} />
          <Parameter title={"Conductivity"} description={"Conductivity is a measure of the ability of water to conduct an electrical current. It is affected by the concentration of dissolved salts and minerals in the water. High conductivity can indicate pollution, as well as the potential for corrosion in water distribution systems."} />
          <Parameter title={"Dissolved Oxygen"} description={"Dissolved oxygen is the amount of oxygen that is dissolved in water. It is essential for the survival of fish and other aquatic life. Low levels of dissolved oxygen can occur in polluted or stagnant water, leading to decreased biodiversity and even fish kills."} />
          <Parameter title={"Suspended Solids"} description={"Suspended solids refer to small particles that are suspended in the water, such as silt or sediment. High levels of suspended solids can indicate erosion or pollution and can have negative impacts on aquatic life and water quality. In addition, suspended solids can adsorb and transport pollutants such as heavy metals and nutrients, and they can also contribute to the eutrophication process"} />
          <Parameter title={"Total Phosphorus"} description={"Total Phosphorus is a measure of the amount of phosphorus present in water. It can come from natural sources such as rocks and soil, or from human activities such as wastewater discharge, agriculture, and stormwater runoff. Phosphorus is an essential nutrient for plants and algae, but too much phosphorus in water can lead to excessive growth of algae and aquatic weeds, and can cause problems such as reduced dissolved oxygen levels and fish kills."} />
          <Parameter title={"5-day Biochemical Oxygen Demand (BOD5)"} description={"BOD5 is a measure of the amount of oxygen required by microorganisms to break down the organic matter in water over a period of five days. It is used to estimate the amount of biodegradable organic material in water. Higher levels of BOD5 can indicate the presence of pollutants such as untreated sewage or industrial waste, and can lead to reduced dissolved oxygen levels in the water, which can harm aquatic life."} />
          <Parameter title={"Ammonia-Nitrogen (NH3-N)"} description={"Ammonia-Nitrogen is a measure of the amount of ammonia present in water. It can come from natural sources such as decomposing organic matter, or from human activities such as wastewater discharge and fertilizer use. Ammonia can be toxic to fish and other aquatic life at high concentrations, and can also contribute to eutrophication, or excessive growth of algae and aquatic plants."} />
          <Parameter title={"Nitrate-Nitrogen (NO3-N)"} description={"Nitrate-Nitrogen is a measure of the amount of nitrate present in water. It can come from natural sources such as soil and rocks, or from human activities such as wastewater discharge and fertilizer use. Nitrate is an essential nutrient for plants and algae, but too much nitrate in water can lead to excessive growth of algae and aquatic plants, and can also cause problems such as reduced dissolved oxygen levels and fish kills."} />
          <Parameter title={"Nitrite-Nitrogen (NO2-N)"} description={"Nitrite-Nitrogen is a measure of the amount of nitrite present in water. Nitrite can be formed in water through the breakdown of organic matter or the oxidation of ammonia. High levels of nitrite in water can be toxic to fish and other aquatic life, and can also cause methemoglobinemia or 'blue baby syndrome' in humans. Nitrite is also an intermediate in the nitrogen cycle and can be converted to nitrate by bacteria."} />
        </Grid>
      </Container>
    </div>
  );
};

export default WaterQualityPage;


