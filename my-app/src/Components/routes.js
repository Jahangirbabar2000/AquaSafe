import React from 'react';
import UsersTable from './usersTable/usersTable';
import usersData from './dummyData/UsersDummy.json'
import SignUp from './signUp/signUp';
import Notifications from './notifications/notifications';
import dummyData from './dummyData/dummy.json'
import { Route, Routes } from 'react-router-dom'
import Visualization from './visualization';
import Sites from './sites';
import Homepage from './homepage/homepage'


function routes() {
  return (
    <div
    >
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userstable" element={<UsersTable data={usersData} />} />
        <Route path="/notifications" element={<Notifications data={dummyData} />} />
        <Route path="/dashboard" element={<Visualization />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </div>

  );
}

export default routes;


