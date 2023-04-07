import React from "react";
import UsersTable from "./usersTable/usersTable";
import SignUp from "./signUp/signUp";
import Login from "./login/login";
// import Notifications from './notifications/notifications';
// import dummyData from './dummyData/dummy.json'
import { Route, Routes } from "react-router-dom";
import Visualization from "./visualization/visualization";
import Sites from "./sites/sites";
import Homepage from "./homepage/homepage";
import DeviceDeployment from "./devices/devices-components/device-deployment";
import NewProject from "./NewProjectForm/NewProject";
import AddSensor from "./Sensor/addSensor";
import WaterQualityPage from "./parameters/parameters";
import NotificationTable from "./NotificationTable/NotificationTable.js";
import SensorsTable from "./Sensor/sensorsTable";
import ParameterTable from "./parameters/ParameterTable"
import Parameter from "./parameters/parameter";
import AddParameter from "./parameters/AddParameterForm";
import Readings from "./Readings/Readings.js";
function routes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/userstable" element={<UsersTable />} />
      <Route path="/notifications" element={<NotificationTable />} />
      <Route path="/dashboard" element={<Visualization />} />
      <Route path="/sites" element={<Sites />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/deviceDeployment" element={<DeviceDeployment />} />
      <Route path="/newProject" element={<NewProject />} />
      <Route path="/addSensor" element={<AddSensor />} />
      <Route path="/sensors" element={<SensorsTable />} />
      <Route path="/WaterQualityPage" element={<WaterQualityPage />} />
      <Route path="/parameters" element={<ParameterTable />} />
      <Route path="/addParameter" element={<AddParameter />} />
      <Route path="/readings" element={<Readings />} />

    </Routes>
  );
}

export default routes;
