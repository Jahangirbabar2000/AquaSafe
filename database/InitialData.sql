USE AquaSafe;

-- WATER QUALITY PARAMETERS --

INSERT INTO WaterParameters (Name, Description) VALUES (
  'pH',
  'pH is a measure of the acidity or basicity of a solution, with a value range of 0-14.');

INSERT INTO WaterParameters (Name, Description) VALUES (
  'Dissolved Oxygen',
  'Dissolved oxygen (DO) is a measure of the amount of oxygen dissolved in water.');

INSERT INTO WaterParameters (Name, Description) VALUES (
  'Water Temperature',
  'Water temperature affects aquatic organisms, gas solubility, and chemical reactions.');

INSERT INTO WaterParameters (Name, Description) VALUES (
  'Suspended Solids',
  'Suspended solids (SS) are tiny particles suspended in water that can affect water clarity and aquatic life.');

INSERT INTO WaterParameters (Name, Description) VALUES (
  '5-day Biochemical Oxygen Demand (BOD5)',
  'BOD5 is a measure of oxygen consumed by microorganisms as they break down organic matter in water over 5 days.');

INSERT INTO WaterParameters (Name, Description) VALUES (
  'Ammonia-Nitrogen (NH3-N)',
  'Ammonia-Nitrogen (NH3-N) is a measure of ammonia present in water, which can be toxic to aquatic life.');

INSERT INTO WaterParameters (Name, Description) VALUES (
  'Total Phosphorus',
  'Total Phosphorus (TP) is a measure of phosphorus present in water, which can contribute to excessive plant and algae growth.');

INSERT INTO WaterParameters (Name, Description) VALUES (
  'Nitrate-Nitrogen (NO3-N)',
  'Nitrate-Nitrogen (NO3-N) is a measure of nitrate present in water, which can contribute to plant and algae overgrowth.');

INSERT INTO WaterParameters (Name, Description) VALUES (
  'Nitrite-Nitrogen (NO2-N)',
  'Nitrite-Nitrogen (NO2-N) is a measure of nitrite present in water, which can be toxic to aquatic life.');


INSERT INTO WaterParameters (Name, Description) VALUES 
('Total Dissolved Solids (TDS)', 'Measurement of the total amount of dissolved solids in water, including minerals, salts, and organic compounds.'),
('Conductivity', 'Measurement of the ability of water to conduct an electric current, which is influenced by the presence of dissolved ions and can indicate water salinity or contamination.'),
('Total Coliforms', 'Indicator of the presence of coliform bacteria in water, which can be an indication of fecal contamination and potential health risks.'),
('Escherichia coli (E. coli)', 'Presence of Escherichia coli bacteria in water, which is an indicator of recent fecal contamination and potential pathogens.'),
('Chemical Oxygen Demand (COD)', 'Measurement of the amount of oxygen required to chemically oxidize organic and inorganic matter in water, which indicates water pollution and the oxygen-consuming capacity of the water.'),
('Total Organic Carbon (TOC)', 'Measurement of the total amount of organic carbon in water, which can indicate the presence of organic pollutants and affect water treatment processes.'),
('Total Nitrogen (TN)', 'Concentration of total nitrogen in water, which includes various forms such as ammonia, nitrate, and organic nitrogen compounds, and can indicate nutrient pollution.'),
('Fecal Coliforms', 'Indicator of the presence of fecal coliform bacteria in water, which specifically indicates recent fecal contamination and potential health risks.'),
('Chloride (Cl-)', 'Concentration of chloride ions in water, which can originate from natural sources or human activities and can indicate saltwater intrusion or pollution.'),
('Total Hardness', 'Measurement of the total concentration of calcium and magnesium ions in water, which can affect water quality and the performance of water treatment processes.'),
('Alkalinity', 'Measurement of the water\'s capacity to neutralize acids, which is influenced by the presence of bicarbonate, carbonate, and hydroxide ions and can affect pH stability.'),
('Total Iron', 'Concentration of total iron in water, which can originate from natural sources or industrial activities and can affect water quality and aesthetics.'),
('Total Manganese', 'Concentration of total manganese in water, which can originate from natural sources or industrial activities and can affect water quality and aesthetics.'),
('Dissolved Metals (such as lead, copper, zinc)', 'Concentration of specific metals, such as lead, copper, and zinc, that are dissolved in water and can indicate pollution from industrial discharges or plumbing systems.'),
('Arsenic', 'Concentration of arsenic in water, which can occur naturally or be introduced through industrial activities and can pose significant health risks.'),
('Fluoride (F-)', 'Concentration of fluoride ions in water, which can occur naturally or be added for dental health purposes and can affect dental health and overall water quality.'),
('Sulfate (SO4 2-)', 'Concentration of sulfate ions in water, which can occur naturally or be introduced through industrial activities and can affect water quality, taste, and odor.'),
('Chlorine Residual', 'Measurement of the remaining concentration of chlorine in water after disinfection, which ensures the maintenance of a disinfectant residual for microbial control.'),
('Pesticides (e.g., herbicides, insecticides)', 'Presence of various pesticides, including herbicides and insecticides, in water, which can indicate pollution from agricultural or urban sources.'),
('Petroleum hydrocarbons', 'Presence of hydrocarbons, such as gasoline or oil, in water, which can indicate pollution from spills or leaks.'),
('Heavy metals (such as mercury, cadmium, chromium)', 'Concentration of specific heavy metals, such as mercury, cadmium, and chromium, in water, which can indicate pollution from industrial activities and pose environmental and health risks.'),
('Radon', 'Concentration of radon gas in water, which can occur naturally and can pose health risks when released into indoor air during water use.'),
('Radioactive isotopes (e.g., tritium, uranium)', 'Presence of radioactive isotopes, such as tritium or uranium, in water, which can occur naturally or as a result of nuclear activities and can pose health risks.'),
('Total Organic Halogens (TOX)', 'Measurement of the total concentration of organic compounds containing halogen atoms, such as chlorine or bromine, in water, which can indicate the presence of disinfection by-products or other organic pollutants.'),
('Total Volatile Organic Compounds (VOCs)', 'Measurement of the total concentration of volatile organic compounds in water, which can originate from industrial activities, fuel spills, or other sources and can pose health risks.'),
('Polycyclic aromatic hydrocarbons (PAHs)', 'Concentration of specific organic compounds, such as polycyclic aromatic hydrocarbons, in water, which can originate from combustion processes or industrial discharges and can pose environmental and health risks.'),
('Phosphate (PO4 3-)', 'Concentration of phosphate ions in water, which can originate from fertilizers, detergents, or other sources and can contribute to nutrient pollution and eutrophication.'),
('Dissolved Silica', 'Concentration of dissolved silica in water, which can occur naturally and can affect water treatment processes and the performance of certain industrial systems.'),
('Dissolved Organic Matter (DOM)', 'Measurement of the total concentration of organic compounds in water, which can indicate the presence of natural or anthropogenic organic substances and affect water treatment processes.');

INSERT INTO `WaterParameters`(`Name`, `Description`)
VALUES ('Oxidation-reduction potential (ORP)', 'A measure of the cleanliness of the water & its ability to break down contaminants. It has implications for the disinfection potential of the water.'),
       ('Salinity', 'The total amount of dissolved salts in water. High salinity can affect the taste of the water and may have health implications if too high.');
       
INSERT INTO WaterParameters (Name, Description) VALUES (
  'Turbidity',
  'Turbidity is the measure of relative clarity of a liquid. It is an optical characteristic of water and is a measurement of the amount of light that is scattered by material in the water when a light is shined through the water sample. The higher the intensity of scattered light, the higher the turbidity'
);

INSERT INTO `ParameterUnits` (`ParameterName`, `Unit`, `Min`, `Max`) VALUES
('5-day Biochemical Oxygen Demand (BOD5)', 'mg/L', 0.1, 10),
('5-day Biochemical Oxygen Demand (BOD5)', 'ppm', 0.1, 10),
('Ammonia-Nitrogen (NH3-N)', 'mg/L', 0.01, 1),
('Ammonia-Nitrogen (NH3-N)', 'ppm', 0.01, 1),
('Ammonia-Nitrogen (NH3-N)', '% saturation', 0, 100),
('Arsenic', 'µg/L', 1, 10),
('Chemical Oxygen Demand (COD)', 'mg/L', 5, 50),
('Chloride (Cl-)', 'mg/L', 10, 250),
('Chlorine Residual', 'mg/L', 0.1, 4),
('Conductivity', 'µS/cm', 100, 1500),
('Dissolved Organic Matter (DOM)', 'mg/L', 1, 10),
('Dissolved Oxygen', 'mg/L', 5, 10),
('Dissolved Oxygen', 'ppm', 5, 10),
('Dissolved Oxygen', '% saturation', 80, 100),
('Dissolved Silica', 'mg/L', 5, 50),
('Escherichia coli (E. coli)', 'CFU/100 mL', 0, 10),
('Fecal Coliforms', 'CFU/100 mL', 0, 10),
('Fluoride (F-)', 'mg/L', 0.5, 1.5),
('Nitrate-Nitrogen (NO3-N)', 'mg/L', 0.1, 10),
('Nitrite-Nitrogen (NO2-N)', 'mg/L', 0.01, 1),
('Petroleum hydrocarbons', 'mg/L', 0.1, 1),
('pH', 'pH units', 6, 8),
('Phosphate (PO4 3-)', 'mg/L', 0.01, 0.1),
('Polycyclic aromatic hydrocarbons (PAHs)', 'µg/L', 0.1, 1),
('Radioactive isotopes (e.g., tritium, uranium)', 'Bq/L', 1, 10),
('Radon', 'Bq/L', 1, 10),
('Sulfate (SO4 2-)', 'mg/L', 10, 250),
('Suspended solids', 'mg/L', 1, 30),
('Total Coliforms', 'CFU/100 mL', 0, 10),
('Total Dissolved Solids (TDS)', 'mg/L', 100, 500),
('Total Dissolved Solids (TDS)', 'ppm', 100, 500),
('Total Hardness', 'mg/L (as CaCO3)', 50, 500),
('Total Iron', 'µg/L', 10, 300),
('Total Manganese', 'µg/L', 10, 400),
('Total Nitrogen (TN)', 'mg/L', 0.1, 10),
('Total Organic Carbon (TOC)', 'mg/L', 1, 10),
('Total Organic Halogens (TOX)', 'µg/L', 1, 10),
('Total Phosphorus', 'mg/L', 0.01, 0.1),
('Total Volatile Organic Compounds (VOCs)', 'µg/L', 1, 10),
('Turbidity', 'NTU', 1, 5),
('Water Temperature', '°C', 5, 25),
('Water Temperature', '°F', 41, 77);

INSERT INTO `ParameterUnits`(`ParameterName`, `Unit`, `Min`, `Max`)
VALUES ('Oxidation-reduction potential (ORP)', 'mV', 200, 600),
       ('Salinity', 'mg/L', 0, 1000);

INSERT INTO `ParameterUnits`(`ParameterName`, `Unit`, `Min`, `Max`)
VALUES ('Oxidation-reduction potential (ORP)', 'V', 0.2, 0.6),
       ('Salinity', 'g/L', 0, 1),
       ('Salinity', 'ppt', 0, 1),
       ('Salinity', 'PSU', 0, 1);

-- ------------------------------------------------------------------
-- DEMO PROJECTS AND DEVICES FOR FIRST RUN
-- ------------------------------------------------------------------

-- Example projects
INSERT INTO Projects (Name, Location, Country, Longitude, Latitude, Description) VALUES
('Victoria Harbour', 'Victoria Harbour', 'Hong Kong', 114.1655, 22.2864, 'Urban coastal water quality monitoring site in Hong Kong.'),
('Rawal Lake', 'Rawal Lake', 'Pakistan', 73.128089, 33.703055, 'Freshwater reservoir monitoring for drinking and irrigation supply.'),
('NUST Lake', 'NUST Campus Lake', 'Pakistan', 72.99435, 33.6425, 'Campus demonstration site for AquaSafe sensors.');

-- Example deployed devices
-- These assume a fresh database where the three projects above receive Ids 1, 2 and 3 respectively.
INSERT INTO DeployedDevices (Name, Longitude, Latitude, Frequency, Project, Locality, CommTech, StatusCode, Sensors) VALUES
('HK-Station-1', 114.1655, 22.2864, '15 Minute', 1, 'Central Ferry Pier 9', 'LORAWAN', 200,
 '[{\"sensor\":\"pH\",\"unit\":\"pH units\"},{\"sensor\":\"Dissolved Oxygen\",\"unit\":\"mg/L\"},{\"sensor\":\"Water Temperature\",\"unit\":\"°C\"}]'),
('HK-Station-2', 114.1731, 22.2988, '30 Minute', 1, 'Tsim Sha Tsui Promenade', 'LORAWAN', 200,
 '[{\"sensor\":\"Conductivity\",\"unit\":\"µS/cm\"},{\"sensor\":\"Salinity\",\"unit\":\"ppt\"}]'),
('Rawal-Station-1', 73.128089, 33.703055, '1 Hour', 2, 'Dam Spillway', 'GSM', 200,
 '[{\"sensor\":\"pH\",\"unit\":\"pH units\"},{\"sensor\":\"Turbidity\",\"unit\":\"NTU\"},{\"sensor\":\"Total Dissolved Solids (TDS)\",\"unit\":\"mg/L\"}]'),
('Rawal-Station-2', 73.1335, 33.7065, '1 Hour', 2, 'Boat Club', 'GSM', 200,
 '[{\"sensor\":\"Dissolved Oxygen\",\"unit\":\"mg/L\"},{\"sensor\":\"Water Temperature\",\"unit\":\"°C\"}]'),
('NUST-Station-1', 72.99435, 33.6425, '10 Minute', 3, 'Campus Lake Pier', 'LORAWAN', 200,
 '[{\"sensor\":\"pH\",\"unit\":\"pH units\"},{\"sensor\":\"Conductivity\",\"unit\":\"µS/cm\"},{\"sensor\":\"Salinity\",\"unit\":\"PSU\"}]');

-- Note: demo readings and notifications are intentionally omitted here because they
-- depend on auto-generated ParameterUnits and device IDs. Once the app is running,
-- devices created above can be used to ingest or simulate real readings.
