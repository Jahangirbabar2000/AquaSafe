DROP schema if exists AquaSafe;
CREATE schema AquaSafe;
USE AquaSafe;

CREATE TABLE `WaterParameters` (
  `Name` VARCHAR (50) not null,
  `Description` VARCHAR (1500),
  `Unit` VARCHAR (20),
  `Min` Float,
  `Max` Float,
  PRIMARY KEY (`Name`)
);
CREATE TABLE `Users` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR (20) NOT NULL, 
  `LastName` VARCHAR (20) NOT NULL,
  `Email` VARCHAR (50) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`Id`)
);
CREATE TABLE `Projects` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR (20),
  `Location` VARCHAR (50),
  `Country` VARCHAR (20),
  `Longitude` Float,
  `Latitude` Float,
  `Description` VARCHAR (500),
  PRIMARY KEY (`Id`)
);
CREATE TABLE `WorksOn` (
  `user` INT NOT NULL,
  `project` INT NOT NULL,  
  `Designation` Enum ('IoT Engineer', 'Local Admin', 'Government Admin') NOT NULL,
  PRIMARY KEY (`user`,`project`),
  FOREIGN KEY (`user`) REFERENCES `Users`(`Id`),
  FOREIGN KEY (`project`) REFERENCES `Projects`(`Id`)
);
CREATE TABLE `Communication` (
  `Id` INT NOT NULL,
  `Type` Enum ('LORAWAN', 'GSM'),
  `Channel/Frequency` Float,
  `Model` VARCHAR (20),
  `Transmitter/recieverID` VARCHAR (20),
  PRIMARY KEY (`Id`)
);
CREATE TABLE `DevicesCatalogue` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Model` VARCHAR (20),
  `Name` VARCHAR (50),
  `CommTech` INT NOT NULL,
  `Sensors` JSON,
  FOREIGN KEY (`CommTech`) REFERENCES `Communication`(`Id`),
  PRIMARY KEY (`Id`)
);
CREATE TABLE `DeployedDevices` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `DeviceType` INT NOT NULL,
  `Name` VARCHAR (20),
  `Longitude` Float,
  `Latitude` Float,
  `Frequency` Integer,
  `Project` INT NOT NULL,
  `Locality` VARCHAR (50),
  `CommTech` Enum ('LORAWAN', 'GSM'),
  `StatusCode` Int,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`DeviceType`) REFERENCES `DevicesCatalogue`(`Id`),
  FOREIGN KEY (`Project`) REFERENCES `Projects`(`Id`)
);
CREATE TABLE `SensorsCatalogue` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Parameter` VARCHAR (50) not null,
  `Model` VARCHAR (20),
  `SensorMin` Float,
  `SensorMax` Float,
   PRIMARY KEY (`Id`),
   FOREIGN KEY (`Parameter`) REFERENCES `WaterParameters`(`Name`)
);
CREATE TABLE `Readings` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Time` Date,
  `Reading` VARCHAR (20),
  `Device` INT NOT NULL,
  `Sensor` INT NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`Device`) REFERENCES `DeployedDevices`(`Id`),
  FOREIGN KEY (`Sensor`) REFERENCES `SensorsCatalogue`(`Id`)
);
CREATE TABLE `Notifications` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Priority` Enum ('high', 'low', 'normal'),
  `Location` VARCHAR (20),
  `Description` VARCHAR (20),
  `Device` INT NOT NULL,
  `Sensor` INT NOT NULL,
  `Time` Date,
  `User` INT NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`Sensor`) REFERENCES `Readings`(`Id`),
  FOREIGN KEY (`Device`) REFERENCES `DevicesCatalogue`(`Id`),
  FOREIGN KEY (`User`) REFERENCES `Users`(`Id`)
);
CREATE TABLE `Action` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Type` Enum ('TBD'),  -- This has to be changed, once actions are finalzied 
  `Description` VARCHAR (20),
  `Notification` INT NOT NULL,
  `User` INT NOT NULL,
  `Time` Date,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`Notification`) REFERENCES `Notifications`(`User`)
);
CREATE TABLE `Predictions` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Time` Date,
  `Reading` VARCHAR (20),
  `Parameter` VARCHAR (20) not null,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`Parameter`) REFERENCES `WaterParameters`(`Name`)
);
CREATE TABLE `Reports` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Device` INT NOT NULL,
  `Description` VARCHAR (20),
  `Time` Date,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`Device`) REFERENCES `DeployedDevices`(`Id`)
);

DROP TABLE IF EXISTS stationCoordinates;
CREATE TABLE `stationCoordinates` (
  `Station` VARCHAR(10) PRIMARY KEY,
  `Latitude` DOUBLE NOT NULL,
  `Longitude` DOUBLE NOT NULL,
  `Site` VARCHAR(255) DEFAULT 'Lam Tsuen River'
);


