import React, { useEffect, useState, useContext } from "react";
import Sidebar2 from "../../sidebar/Sidebar2.js";
import Navbar from "../../navbar/navbar.js";
import Button from "@mui/material/Button";
import SensorNotification from "./SensorNotifications.js";
import DeviceNotification from "./DeviceNotifications.js";
import axios from 'axios';
import UserContext from "../../userAuth/UserContext.js";
import { Box } from '@mui/system';

export default function NotificationTable() {
  const [notifications, setNotifications] = useState([]);
  const [showDevice, setShowDevice] = useState(false);
  const { user, setUser } = useContext(UserContext);


  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios
      .get('/api/notifications')
      .then(response => {
        // Filter notifications based on user ID
        const filteredNotifications = response.data.filter(
          notification => notification.user === user.id
        );
        // Update state with filtered notifications
        setNotifications(filteredNotifications);
      })
      .catch(error => {
        console.error('There was an error fetching notifications!', error);
      });
  };

  const SensorNotifications = notifications.filter(
    (item) => item.type !== "device"
  );
  const DeviceNotifications = notifications.filter(
    (item) => item.type !== "sensor"
  );

  const handleClick = () => {
    setShowDevice(true);
  };

  const handleClick2 = () => {
    setShowDevice(false);
  };

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.grey[0], minHeight: '100vh' }}>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28vh auto",
          // gridGap: "2px",
        }}
      >
        <div>
          <Sidebar2 name="Notifications" />
        </div>
        <div style={{ marginLeft: 60 }}>
          <Button
            variant="contained"
            style={{
              marginLeft: "4%",
              padding: "0.5%",
              marginTop: "10px",
            }}
            onClick={handleClick2}
            color={`${showDevice === false ? "success" : "primary"}`}
          >
            Sensor
          </Button>
          <Button
            style={{
              marginLeft: "1%",
              padding: "0.5%",
              marginTop: "10px",
            }}
            variant="contained"
            onClick={handleClick}
            color={`${showDevice === true ? "success" : "primary"}`}
          >
            Device
          </Button>

          {showDevice ? (
            <DeviceNotification data={DeviceNotifications} /> // this will show device notifications
          ) : (
            <SensorNotification data={SensorNotifications} /> //this will show sensor notifications
          )}
        </div>
      </div>
    </Box>
  );
}

