import axios from "axios";
import { useEffect, useState } from "react";
import TableRow from "./tableRow";
import "./tableRow.css";
import Sidebar from "../sidebar/side-bar";
import { Grid } from "@mui/material";
import Navbar from "../navbar/navbar.js";

function UsersTable() {
  const [usersData, setUsersData] = useState([]);

  const getUsersData = async (req, res) => {
    res = await axios.get("http://localhost:8080/activeUsers");
    console.log(res.data);
    setUsersData(res.data);
  };

  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item xs={4} sm={5} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={8} sm={7} md={9}>
          <h1>Active Users</h1>
          <input type="text"></input>
          <button>Search</button>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Country</th>
              <th>Site</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => {
              return <TableRow key={user.Id} user={user} />;
            })}
          </tbody>
        </Grid>
      </Grid>
    </div>
  );
}

export default UsersTable;
