USE AquaSafe;

-- WATER QUALITY PARAMETERS -- :
INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('pH', 
'pH is a measure of the acidity or basicity of a solution, with a value range of 0-14. A pH of 7 is considered neutral, 
values less than 7 are acidic, and values greater than 7 are basic or alkaline. The pH scale is logarithmic, meaning that 
each increment of one on the pH scale corresponds to a tenfold difference in acidity or basicity.', null , 6.5, 8.5);

INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('Dissolved Oxygen', 
'Dissolved oxygen (DO) is a measure of the amount of oxygen that is dissolved in water. It is an 
important water quality parameter because oxygen is necessary for the survival of aquatic organisms.
 A sufficient level of dissolved oxygen is typically considered to be around 6-8 mg/L, but this can vary 
 depending on the species of fish and other aquatic life that are present. Low levels of dissolved oxygen
 can be caused by a variety of factors, including high temperatures, low flow, and pollution. High levels 
 of dissolved oxygen can also be a problem, as it can lead to the growth of unwanted aquatic plants and algae. 
 Therefore dissolved oxygen is an important parameter to measure for the health of aquatic ecosystem.', 'mg/L' , 5, 11);

INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('Water Temperature', 
'Different aquatic organisms have different temperature requirements, and changes in water temperature can have a
 significant impact on their survival and reproduction. Water temperature also affects the solubility of gases such 
 as oxygen and carbon dioxide, which can have a significant impact on the aquatic ecosystem. In general, as the water
 temperature increases, the solubility of gases decreases, which can lead to lower levels of dissolved oxygen and increased 
 levels of carbon dioxide. In addition, water temperature also affects the rate of chemical reactions in water, including the 
 breakdown of pollutants and the growth of microorganisms. For drinking water, the recommended temperature range is between
 4-22°C (39-71°F) for optimal taste and to minimize the growth of harmful microorganisms.', '°C' , 4, 22);
 
INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('Suspended solids', 
'Suspended solids (SS) are tiny particles that are suspended in water and do not settle to the bottom. These particles can include
 a variety of materials such as clay, silt, algae, bacteria, and organic and inorganic matter. Suspended solids can have an impact
 on the water quality and the aquatic ecosystem. Suspended solids can affect the clarity of the water, making it cloudy or 
 turbid, which can make it difficult for fish and other aquatic organisms to see and find food. High levels of suspended solids 
 can also clog the gills of fish, making it difficult for them to breathe. Suspended solids can also provide a substrate for 
 the growth of microorganisms, which can lead to increased levels of bacteria and other harmful organisms in the water. In 
 addition, suspended solids can adsorb and transport pollutants such as heavy metals and nutrients, and they can also contribute 
 to the eutrophication process. For drinking water, the recommended maximum level of suspended solids is around 1-5 mg/L,
 depending on the specific water body. This is to ensure that the water is clean and safe for human consumption.', 'mg/L' , 1, 5);
 
INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('Conductivity', 
'Conductivity is a measure of the ability of a water sample to conduct an electrical current. It is typically measured 
in units of microsiemens per centimeter (µS/cm) or millisiemens per centimeter (mS/cm). Conductivity is an important 
water quality parameter because it is related to the total dissolved solids (TDS) and ionic content of the water.
Conductivity is primarily affected by the presence of dissolved ions such as sodium, chloride, calcium, and magnesium.
 The more ions present in the water, the higher the conductivity will be. Water with a high conductivity is considered 
 to be more "hard," whereas water with a low conductivity is considered to be more "soft." Conductivity can be used to 
 estimate the total dissolved solids (TDS) in a water sample. TDS is a measure of the total amount of dissolved solids, 
 such as minerals and salts, in a water sample. TDS is often used as an indicator of water quality, and it can have an 
 impact on the taste, appearance, and suitability of the water for different uses.Conductivity can also provide 
 information on the source of the water, whether it is from surface water or groundwater. Groundwater typically has 
 lower conductivity than surface water.', 'µS/cm' , 100, 1000);
 
 INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('5-day Biochemical Oxygen Demand (BOD5)', 
'5-day Biochemical Oxygen Demand (BOD5) is a measure of the amount of oxygen that is consumed by microorganisms as they break 
down organic matter in water over a 5-day period. It is used as an indicator of the quality of water and the level of pollution 
in a water body. BOD5 is typically measured in milligrams per liter (mg/L).The BOD5 test is a measure of the oxygen demand of 
biodegradable organic matter present in water. As microorganisms consume the organic matter, they use up oxygen in the water. 
The higher the BOD5 value, the greater the amount of organic matter and the greater the oxygen demand.BOD5 is an important water 
quality parameter because high levels of BOD5 can indicate that a water body is being impacted by pollution from sources such as
sewage, agricultural runoff, or industrial discharge. High BOD5 values can lead to decreased levels of dissolved oxygen in the
water, which can have negative impacts on the survival and reproduction of fish and other aquatic organisms. For drinking water, 
the recommended maximum level of BOD5 is around 3-5 mg/L, depending on the specific water body. This is to ensure that the water 
is clean and safe for human consumption, and that it meets the standards for BOD5 established by the World Health Organization 
(WHO) and national and local regulatory agencies.', 'mg/L' , 1, 5);

 INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('Ammonia-Nitrogen (NH3-N)', 
'Ammonia-Nitrogen (NH3-N) is a measure of the amount of ammonia present in water. Ammonia is a compound made up of nitrogen and
 hydrogen, and it is a common byproduct of the breakdown of organic matter in water. Ammonia is toxic to fish and other aquatic 
 organisms at certain concentrations, and it is also an indicator of pollution in a water body.In water, ammonia can exist in two
 forms: unionized ammonia (NH3) and ionized ammonia (NH4+). The ionized form is less toxic than the unionized form, and the relative
 amount of each form depends on the pH and temperature of the water.High levels of ammonia in water can have negative impacts on the
 survival and reproduction of fish and other aquatic organisms. It can also contribute to the eutrophication process (excessive 
 growth of algae) by providing a source of nitrogen for algae growth.For drinking water, the recommended maximum level of 
 ammonia-nitrogen is around 1-3 mg/L, depending on the specific water body. This is to ensure that the water is clean and safe 
 for human consumption, and that it meets the standards for ammonia-nitrogen established by the World Health Organization (WHO)
 and national and local regulatory agencies.', 'mg/L' , 0.25, 3);
 
INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('Total Phosphorus', 
'Total Phosphorus (TP) is a measure of the amount of phosphorus present in water. Phosphorus is a nutrient that is essential 
for the growth of plants and algae, but too much of it can lead to excessive growth of aquatic plants and algae, which can have 
negative impacts on the quality of the water.Phosphorus can occur in water in several forms such as orthophosphate (PO4-3), 
polyphosphates, and organic phosphorus. The most common form of phosphorus in water is orthophosphate.High levels of phosphorus 
in water can contribute to the eutrophication of a water body, which can lead to decreased oxygen levels, fish kills, and other 
negative impacts on the aquatic ecosystem.For drinking water, the recommended maximum level of Total Phosphorus is around 
0.1-0.3 mg/L, depending on the specific water body. This is to ensure that the water is clean and safe for human consumption,
 and that it meets the standards for Total Phosphorus established by the World Health Organization (WHO) and national and local 
 regulatory agencies.', 'mg/L' , 0, 3);
 
 INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('Nitrate-Nitrogen (NO3-N)', 
'Nitrate-Nitrogen (NO3-N) is a measure of the amount of nitrate present in water. Nitrate is a form of nitrogen that is essential 
for the growth of plants and algae, but too much of it can lead to excessive growth of aquatic plants and algae, which can have 
negative impacts on the quality of the water. Nitrate can also be harmful to human health, especially for infants.High levels of
 nitrate in water can contribute to the eutrophication of a water body, which can lead to decreased oxygen levels, fish kills, and
 other negative impacts on the aquatic ecosystem. It can also be harmful to human health, especially for infants and pregnant 
 women.For drinking water, the recommended maximum level of Nitrate-Nitrogen is around 10-45 mg/L, depending on the specific
 water body. This is to ensure that the water is clean and safe for human consumption, and that it meets the standards for 
 Nitrate-Nitrogen established by the World Health Organization (WHO) and national and local regulatory agencies.', 'mg/L' , 0, 10);
 
  INSERT into WaterParameters (Name, Description, Unit, Min, Max) VALUES ('Nitrite-Nitrogen (NO2-N)', 
'Nitrite-Nitrogen (NO2-N) is a measure of the amount of nitrite present in water. Nitrite is a form of nitrogen that is produced 
during the breakdown of nitrate by bacteria in water. Like nitrate, nitrite can also be harmful to human health, especially for
 infants and pregnant women.High levels of nitrite in water can be toxic to fish and other aquatic organisms, and it can also be 
 harmful to human health, especially for infants and pregnant women.For drinking water, the recommended maximum level of 
 Nitrite-Nitrogen is around 1-3 mg/L, depending on the specific water body. This is to ensure that the water is clean and 
 safe for human consumption, and that it meets the standards for Nitrite-Nitrogen established by the World Health Organization 
 (WHO) and national and local regulatory agencies.', 'mg/L' , 0, 1);


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

 
-- SENSORS CATALOGUE -- :
 
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (1, 'pH', 'censoR203' , 0, 14);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (2, 'Dissolved Oxygen', 'censoR213' , 0, 20);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (3, 'Water Temperature', 'censoR215' , 0, 100);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (4, 'Suspended solids',  'censoR218' , 0, 10);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (5, 'Conductivity' , 'censoR222' , 0, 2000);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (6, '5-day Biochemical Oxygen Demand (BOD5)', 'censoR235' , 0, 20);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (7, 'Ammonia-Nitrogen (NH3-N)', 'censoR257' , 0, 20);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (8, 'Total Phosphorus', 'censoR285' , 0, 20);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (9, 'Nitrate-Nitrogen (NO3-N)', 'censoR295' , 0, 20);
 INSERT into SensorsCatalogue (Id, Parameter, Model, SensorMin, SensorMax) VALUES (10, 'Nitrite-Nitrogen (NO2-N)', 'censoR299' , 0, 20);

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

INSERT into DevicesCatalogue (Model, Name, CommTech, Sensors) 
VALUES ('Arduino54B', 'Device215' , 1, '{"sensor1": "temperature", "sensor2": "humidity", "sensor3": "pressure"}');

INSERT INTO DevicesCatalogue (Model, Name, CommTech, Sensors)
VALUES ('Arduino54B', 'Device215', 1, '{"sensor1": "Water Temperature", "sensor2": "Total Phosphorus", "sensor3": "Suspended solids", "sensor4": "pH", "sensor5": "Nitrite-Nitrogen (NO2-N)", "sensor6": "Nitrate-Nitrogen (NO3-N)", "sensor7": "Dissolved Oxygen", "sensor8": "Conductivity", "sensor9": "Ammonia-Nitrogen (NH3-N)", "sensor10": "5-day Biochemical Oxygen Demand (BOD5)"}');

INSERT INTO DevicesCatalogue (Model, Name, CommTech, Sensors)
VALUES ('Arduino54B', 'Device215', 1, '{"sensor1": "Water Temperature", "sensor2": "Total Phosphorus", "sensor3": "Suspended solids", "sensor4": "pH", "sensor5": "Nitrite-Nitrogen (NO2-N)", "sensor6": "Nitrate-Nitrogen (NO3-N)", "sensor7": "Dissolved Oxygen", "sensor9": "Ammonia-Nitrogen (NH3-N)"}');

