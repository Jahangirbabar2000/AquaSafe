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
    </Routes>
  );
}

export default routes;
