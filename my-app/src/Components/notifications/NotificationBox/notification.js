import React from "react";
import Box from "@mui/material/Box";

import "./notification.css";

function DisplayNotfication(props) {
  const notification = props.item;

  if (notification.code === 10) {
    notification.details = notification.sensor + " is at dangerous level.";
  } else if (notification.code === 11) {
    notification.details =
      notification.sensor + " is close to dangerous level.";
  } else if (notification.code === 12) {
    notification.details = notification.sensor + " is at optimal level.";
  } else if (notification.code === 20) {
    notification.details = notification.device + " has crashed.";
  } else if (notification.code === 21) {
    notification.details = notification.device + " has moved";
  }
  return (

    <div id="notification">
      <div style={{ display: "flex" }}>
        <p className="notification-subheading-title">
          {/* Status:{" "} */}
          <span
            className={`${notification.status === "Urgent" ? "urgent" : "moderate"
              }`}
          >
            {notification.status}
          </span>
        </p>
        <p style={{ marginLeft: "10%", marginTop: 10 }} >
          {/* Date: {notification.date} */}
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <p className="notification-subheading-title">
          Project:{" "}
          <span className="notification-info">{notification.project}</span>
        </p>
        <p
          className="notification-subheading-title"
          style={{ marginLeft: 25 }}
        >
          Device:
          <span className="notification-info"> {notification.device}</span>
        </p>
      </div>
      <p className="notification-subheading-title">
        Details:{" "}
        <span className="notification-details">{notification.details}</span>
      </p>
      <p >
        Date: {notification.date}
      </p>
    </div>
  );
}

function RenderNotifications(props) {
  const notifications = props.data;

  return (
    // <div style={{ marginLeft:"auto"}}>
    // <Box>
    <Box sx={{ zIndex: 100 }} className="notifications-container hidescroll">
      {notifications.map((entry) => (
        <div className="one-notification-container" key={entry.id}>
          <DisplayNotfication item={entry} />
        </div>
      ))}
    </Box>
    // </Box>
    // </div>
  );
}


export default RenderNotifications;
