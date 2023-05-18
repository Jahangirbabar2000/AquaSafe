USE AquaSafe;

-- WATER QUALITY PARAMETERS --

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'pH',
  'pH is a measure of the acidity or basicity of a solution, with a value range of 0-14.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'Dissolved Oxygen',
  'Dissolved oxygen (DO) is a measure of the amount of oxygen dissolved in water.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'Water Temperature',
  'Water temperature affects aquatic organisms, gas solubility, and chemical reactions.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'Suspended Solids',
  'Suspended solids (SS) are tiny particles suspended in water that can affect water clarity and aquatic life.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'Conductivity',
  'Conductivity is a measure of water sample\'s ability to conduct an electrical current.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  '5-day Biochemical Oxygen Demand (BOD5)',
  'BOD5 is a measure of oxygen consumed by microorganisms as they break down organic matter in water over 5 days.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'Ammonia-Nitrogen (NH3-N)',
  'Ammonia-Nitrogen (NH3-N) is a measure of ammonia present in water, which can be toxic to aquatic life.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'Total Phosphorus',
  'Total Phosphorus (TP) is a measure of phosphorus present in water, which can contribute to excessive plant and algae growth.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'Nitrate-Nitrogen (NO3-N)',
  'Nitrate-Nitrogen (NO3-N) is a measure of nitrate present in water, which can contribute to plant and algae overgrowth.');

INSERT INTO WaterParameters (Name, Description, Unit, Min, Max) VALUES (
  'Nitrite-Nitrogen (NO2-N)',
  'Nitrite-Nitrogen (NO2-N) is a measure of nitrite present in water, which can be toxic to aquatic life.');


INSERT INTO `waterparameters` (`Name`, `Description`) VALUES
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



INSERT INTO Users VALUES (1, 'John', 'Doe', 'johndoe@gmail.com', '8c0dcb6d09f07ccfbf126793e6c80f4a'),
(2, 'Jane', 'Smith', 'janesmith@gmail.com', 'bef9e89bcd01cabed41a3cce0d3ca3d2'),
(3, 'Bob', 'Johnson', 'bobjohnson@gmail.com', 'bcdef0123456789abcdef01234567890'),
(4, 'Emily', 'Davis', 'emilydavis@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99'),
(5, 'Michael', 'Brown', 'michaelbrown@gmail.com','9876543210fedcba9876543210fedcba9');

INSERT INTO Projects (Name, Location, Country, Longitude, Latitude, Description) VALUES 
('Rawal Lake', 'Islamabad', 'Pakistan',  73.126568, 33.702092,'Rawal Lake in Pakistan is an artificial reservoir that provides the water needs for the cities of 
Rawalpindi and Islamabad. Korang River along with some other small streams coming from Margalla Hills have
been set to form this artificial lake which covers an area of 8.8 km². Korang River is the outlet stream of 
Rawal Dam. Rawal Lake is located within an isolated section of the Village Malpur, Bani Gala and Margalla Hills National Park'),

('Khanpur Dam', 'Khanpur, Khyber Pakhtunkhwa', 'Pakistan', 72.935843,33.809096,'Khanpur Dam is a dam located on the Haro River in Khanpur,
 Khyber Pakhtunkhwa about 50 km from Islamabad. It forms Khanpur Lake, a reservoir which supplies drinking water to Islamabad and Rawalpindi and 
 irrigation water to many of the agricultural and industrial areas surrounding the cities.');

INSERT INTO WorksOn VALUES (1, 1, 'IoT Engineer'), (2 , 1,'Local Admin'), (3, 1, 'Government Admin'),
(4, 2, 'IoT Engineer'), (5, 2, 'Local Admin');

 
INSERT into Communication VALUES (1, 'LORAWAN', 99.5 , 'lORa231', '29E');

INSERT into DeployedDevices VALUES (1, 1, 'A24R' , 33.7027, 73.1261, 5, 1, 'NorthEastCornerDevice', 'LORAWAN', 505);

INSERT INTO Readings (Id, Time, Reading, Device, Sensor) VALUES  (1,'2022-10-07 00:00:00',5.1,1,1) 
,(2,'2022-10-08 00:00:00',5.7,1,1) ,(3,'2022-10-09 00:00:00',6.5,1,1)
,(4,'2022-10-16 00:00:00',11.8,1,1) ,(5,'2022-10-17 00:00:00',8.5,1,1)
,(6,'2022-10-18 00:00:00',10.2,1,1) ,(7,'2022-10-19 00:00:00',4.6,1,1)
,(8,'2022-10-20 00:00:00',1.5,1,1) ,(9,'2022-10-21 00:00:00',9.5,1,1);

DROP TABLE IF EXISTS stationCoordinates;
CREATE TABLE `stationCoordinates` (
  `Station` VARCHAR(10) PRIMARY KEY,
  `Latitude` DOUBLE NOT NULL,
  `Longitude` DOUBLE NOT NULL,
  `Site` VARCHAR(255) DEFAULT 'Lam Tsuen River'
);

-- Populate the new table with random coordinates for each Station
-- INSERT IGNORE INTO `stationCoordinates` (`Station`, `Latitude`, `Longitude`)
-- SELECT DISTINCT `Station`, RAND()*0.01 + 22.42415, RAND()*0.01 + 114.12423 FROM `hongkongdataset`;

INSERT INTO `stationCoordinates` (`Station`, `Latitude`, `Longitude`, `Site`)
VALUES
('YL4',22.45012,114.13554, 'Lam Tsuen River'),
('YL3',22.45037,114.13576, 'Lam Tsuen River'),
('YL2', 22.45153,114.13640, 'Lam Tsuen River'),
('YL1', 22.45337,114.13649, 'Lam Tsuen River'),
('TW3', 22.45500,114.13602, 'Lam Tsuen River'),
('TW2', 22.45618,114.13787, 'Lam Tsuen River'),
('TW1', 22.45657,114.13985, 'Lam Tsuen River'),
('TSR2', 22.45789,114.14105, 'Lam Tsuen River'),
('TSR1',22.45963,114.14050, 'Lam Tsuen River'),
('TR6', 22.46106,114.14221, 'Lam Tsuen River'),
('TR4', 22.46177,114.14409, 'Lam Tsuen River'),
('TR23L', 22.46201,114.14587, 'Lam Tsuen River'),
('TR23A', 22.44796,114.17257, 'Lam Tsuen River'),
('TR20B', 22.46085,114.14765, 'Lam Tsuen River'),
('TR19I', 22.45968,114.14821, 'Lam Tsuen River'),
('TR19C', 22.44972,114.17264, 'Lam Tsuen River'),
('TR19A', 22.44720,114.17266, 'Lam Tsuen River'),
('TR19', 22.45837,114.15055, 'Lam Tsuen River'),
('TR17L',22.45742,114.15107, 'Lam Tsuen River'),
('TR17', 22.45608,114.15225, 'Lam Tsuen River'),
('TR14', 22.45517,114.15277, 'Lam Tsuen River'),
('TR13', 22.45388,114.15355, 'Lam Tsuen River'),
('TR12I',22.45227,114.15405, 'Lam Tsuen River'),
('TR12H', 22.45102,114.15670, 'Lam Tsuen River'),
('TR12G', 22.45012,114.15855, 'Lam Tsuen River'),
('TR12F', 22.44917,114.16110, 'Lam Tsuen River'),
('TR12E',22.45000,114.16349, 'Lam Tsuen River'),
('TR12D', 22.45042,114.16489, 'Lam Tsuen River'),
('TR12C', 22.45068,114.16838, 'Lam Tsuen River'),
('TR12B', 22.44947,114.17651, 'Lam Tsuen River');

INSERT INTO `parameterunits` (`ParameterName`, `Unit`, `Min`, `Max`) VALUES
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

INSERT INTO `WaterParameters`(`Name`, `Description`)
VALUES ('Oxidation-reduction potential (ORP)', 'A measure of the cleanliness of the water & its ability to break down contaminants. It has implications for the disinfection potential of the water.'),
       ('Salinity', 'The total amount of dissolved salts in water. High salinity can affect the taste of the water and may have health implications if too high.');

INSERT INTO `ParameterUnits`(`ParameterName`, `Unit`, `Min`, `Max`)
VALUES ('Oxidation-reduction potential (ORP)', 'mV', 200, 600),
       ('Salinity', 'mg/L', 0, 1000);

INSERT INTO `ParameterUnits`(`ParameterName`, `Unit`, `Min`, `Max`)
VALUES ('Oxidation-reduction potential (ORP)', 'V', 0.2, 0.6),
       ('Salinity', 'g/L', 0, 1),
       ('Salinity', 'ppt', 0, 1),
       ('Salinity', 'PSU', 0, 1);


-- Dummy data for Date = '2023-01-01'
INSERT INTO readings (`Time`, `Reading`, `Device`, `Parameter`, `UnitId`)
VALUES
    ('2023-01-01', '10.2', 10, '5-day Biochemical Oxygen Demand (BOD5)', 1),
    ('2023-01-01', '7.8', 10, 'Chemical Oxygen Demand (COD)', 1),
    ('2023-01-01', '250', 10, 'Conductivity', 10),
    ('2023-01-01', '0.8', 10, 'Ammonia-Nitrogen (NH3-N)', 2),
    ('2023-01-01', '5', 10, 'Dissolved Oxygen', 13),
    ('2023-01-01', '1.5', 10, 'Fluoride (F-)', 19),
    ('2023-01-01', '7', 10, 'pH', 25),
    ('2023-01-01', '0.03', 10, 'Phosphate (PO4 3-)', 26);
    -- Add dummy data for other parameters on the same date
    
-- Dummy data for Date = '2023-01-02'
INSERT INTO readings (`Time`, `Reading`, `Device`, `Parameter`, `UnitId`)
VALUES
    ('2023-01-02', '10', 10, '5-day Biochemical Oxygen Demand (BOD5)', 1),
    ('2023-01-02', '8', 10, 'Chemical Oxygen Demand (COD)', 1),
    ('2023-01-02', '200', 10, 'Conductivity', 10),
    ('2023-01-02', '0.7', 10, 'Ammonia-Nitrogen (NH3-N)', 2),
    ('2023-01-02', '4.5', 10, 'Dissolved Oxygen', 13),
    ('2023-01-02', '1.3', 10, 'Fluoride (F-)', 19),
    ('2023-01-02', '7.2', 10, 'pH', 25),
    ('2023-01-02', '0.02', 10, 'Phosphate (PO4 3-)', 26);
    -- Add dummy data for other parameters on the same date
    
-- Dummy data for Date = '2023-01-03'
INSERT INTO readings (`Time`, `Reading`, `Device`, `Parameter`, `UnitId`)
VALUES
    ('2023-01-03', '9.5', 10, '5-day Biochemical Oxygen Demand (BOD5)', 1),
    ('2023-01-03', '6.2', 10, 'Chemical Oxygen Demand (COD)', 1),
    ('2023-01-03', '180', 10, 'Conductivity', 10),
    ('2023-01-03', '0.6', 10, 'Ammonia-Nitrogen (NH3-N)', 2),
    ('2023-01-03', '4.8', 10, 'Dissolved Oxygen', 13),
        ('2023-01-03', '1.1', 10, 'Fluoride (F-)', 19),
    ('2023-01-03', '7.5', 10, 'pH', 25),
    ('2023-01-03', '0.025', 10, 'Phosphate (PO4 3-)', 26);
    -- Add dummy data for other parameters on the same date
    
-- Dummy data for Date = '2023-01-04'
INSERT INTO readings (`Time`, `Reading`, `Device`, `Parameter`, `UnitId`)
VALUES
    ('2023-01-04', '8.8', 10, '5-day Biochemical Oxygen Demand (BOD5)', 1),
    ('2023-01-04', '5.5', 10, 'Chemical Oxygen Demand (COD)', 1),
    ('2023-01-04', '150', 10, 'Conductivity', 10),
    ('2023-01-04', '0.5', 10, 'Ammonia-Nitrogen (NH3-N)', 2),
    ('2023-01-04', '3.5', 10, 'Dissolved Oxygen', 13),
    ('2023-01-04', '1.0', 10, 'Fluoride (F-)', 19),
    ('2023-01-04', '7.8', 10, 'pH', 25),
    ('2023-01-04', '0.03', 10, 'Phosphate (PO4 3-)', 26);
    -- Add dummy data for other parameters on the same date
    
-- Dummy data for Date = '2023-01-05'
INSERT INTO readings (`Time`, `Reading`, `Device`, `Parameter`, `UnitId`)
VALUES
    ('2023-01-05', '7.2', 10, '5-day Biochemical Oxygen Demand (BOD5)', 1),
    ('2023-01-05', '4.2', 10, 'Chemical Oxygen Demand (COD)', 1),
    ('2023-01-05', '120', 10, 'Conductivity', 10),
    ('2023-01-05', '0.4', 10, 'Ammonia-Nitrogen (NH3-N)', 2),
    ('2023-01-05', '3.0', 10, 'Dissolved Oxygen', 13),
    ('2023-01-05', '0.8', 10, 'Fluoride (F-)', 19),
    ('2023-01-05', '7.0', 10, 'pH', 25),
    ('2023-01-05', '0.02', 10, 'Phosphate (PO4 3-)', 26);
    -- Add dummy data for other parameters on the same date
    
-- Continue inserting dummy data for other dates and devices

-- Dummy data for Device with Id = 11
-- Insert dummy data for Device with Id = 11, following a similar pattern as above

-- Dummy data for Device with Id = 12
-- Insert dummy data for Device with Id = 12, following a similar pattern as above

-- Continue inserting dummy data for other devices


