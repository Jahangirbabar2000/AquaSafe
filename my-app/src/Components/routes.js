import React, { useContext } from 'react';
import UserContext from './userAuth/UserContext';
import UsersTable from "./usersTable/usersTable";
import SignUp from "./userAuth/signUp/signUp";
import Login from "./userAuth/login/login";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Visualization from "./visualization/visualization";
import Sites from "./sites/sites";
import Homepage from "./homepage/homepage";
import DeviceDeployment from "./devices/devices-components/device-deployment";
import NewProject from "./NewProjectForm/NewProject";
import WaterQualityPage from "./parameters/parameters";
import NotificationTable from "./notifications/NotificationTable/NotificationTable";
import ParameterTable from "./parameters/ParameterTable"
import AddParameter from "./parameters/AddParameterForm";
import Readings from "./Readings/Readings.js";
import DeviceTemplates from "./devices/devices-components/deviceTemplate";
import ProjectApp from "./projects/ProjectApp";
import Todos from "./Todos/Todos"
import EditUser from './usersTable/editUser';
import Error404 from './userAuth/errorPage';

const ProtectedOutlet = ({ allowedDesignations }) => {
  const { user } = useContext(UserContext);
  if (!user || !allowedDesignations.includes(user.designation)) {
    return <Navigate to="/error404" />;
  }
  return <Outlet />;
};

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/userstable"
        element={<ProtectedOutlet allowedDesignations={['Local Admin']} />}>
        <Route index element={<UsersTable />} />
      </Route>
      <Route path="/notifications" element={<NotificationTable />} />
      <Route path="/dashboard" element={<Visualization />} />
      <Route path="/sites" element={<Sites />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/deviceTemplate" element={<DeviceTemplates />} />
      <Route path="/deviceDeployment" element={<DeviceDeployment />} />
      <Route path="/newProject" element={<NewProject />} />
      <Route path="/projects" element={<ProjectApp />} />
      <Route path="/WaterQualityPage" element={<WaterQualityPage />} />
      <Route path="/parameters" element={<ParameterTable />} />
      <Route path="/addParameter" element={<AddParameter />} />
      <Route path="/readings" element={<Readings />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/editUser/:id" element={<EditUser />} />
      <Route path="/error404" element={<Error404 />} />
      <Route path="*" element={<Error404 />} />

    </Routes>
  );
}

export default routes;
