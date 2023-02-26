import Notification from "./notification";
import "./notifications.css";
import { Grid } from "@mui/material";
import Sidebar from "../sidebar/side-bar";
import Navbar from "../navbar/navbar.js";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Notifications = props => {
  const data = props.data;
  const [copyData, setCopyData] = useState([...data]);
  const urgentHandler = () => {
    setCopyData(data.filter((item) => { return item.pH > 10 }));
  }
  const moderateHandler = () => {
    setCopyData(data.filter((item) => { return item.pH < 10 }));
  }


  return (
    <div>
      <Navbar />
      <Grid container>
        <Sidebar name="notification" />
        <Grid item xs={8} sm={7} md={12}>
          <h1>Notifications History</h1>
          <div id="button-container">
            <Button onClick={urgentHandler}>Urgent</Button>
            <Button onClick={moderateHandler}>Moderate</Button>
            <Button onClick={() => setCopyData(data)}>All</Button>
          </div>
          <div className="notifications">
            {copyData.map(notification => {
              return <Notification notifData={notification} />;
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Notifications;