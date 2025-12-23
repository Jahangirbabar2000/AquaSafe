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
import WaterQualityPage from "./parameters/parameters";
import NotificationTable from "./notifications/NotificationTable/NotificationTable";
import ParameterTable from "./parameters/ParameterTable"
import AddParameter from "./parameters/AddParameterForm";
import ReadingsPage from "./Readings/ReadingsPage.js";
import ProjectApp from "./projects/ProjectApp";
// import Todos from "./Todos/Todos"
import EditUser from './usersTable/editUser';
import Error404 from './userAuth/errorPage';
import ProjectManagement from './visualization/projectManagement';
import NewProject from './projects/NewProjectForm/NewProject';
import DashboardRedirect from './DashboardRedirect';

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
      <Route path="/newProject"
        element={<ProtectedOutlet allowedDesignations={['Local Admin']} />}>
        <Route index element={<NewProject />} />
      </Route>
      <Route path="/notifications" element={<NotificationTable />} />
      <Route path="/dashboard" element={<DashboardRedirect />} />
      <Route path="/dashboard/:projectId" element={<Visualization />} />
      <Route path="/sites" element={<Sites />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/deviceDeployment" element={<DeviceDeployment />} />
      <Route path="/projects" element={<ProjectApp />} />
      <Route path="/WaterQualityPage" element={<WaterQualityPage />} />
      <Route path="/parameters" element={<ParameterTable />} />
      <Route path="/addParameter" element={<AddParameter />} />
      <Route path="/readings" element={<ReadingsPage />} />
      {/* <Route path="/todos" element={<Todos />} /> */}
      <Route path="/projectManagement/:projectId" element={<ProjectManagement />} />
      <Route path="/editUser/:id" element={<EditUser />} />
      <Route path="/error404" element={<Error404 />} />
      <Route path="*" element={<Error404 />} />

    </Routes>
  );
}

export default routes;
