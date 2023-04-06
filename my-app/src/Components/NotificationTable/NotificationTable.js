import React, { useState } from "react";
import Sidebar from "../sidebar/side-bar.js";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import Button from "@mui/material/Button";
import data from "../NotificationBox/notification.json";
import SensorNotification from "./SensorNotifications";
import DeviceNotification from "./DeviceNotifications.js"
import "./NotificationTable.css";

// this function adds details attribute to the json file depending on the error code.
function AddDetails(data) {
  const DetailsData = data.map(entry => {
    if (entry.code === 10) {
      entry.details = entry.sensor + " is at dangerous level.";
    } else if (entry.code === 11) {
      entry.details = entry.sensor + " is close to dangerous level.";
    } else if (entry.code === 12) {
      entry.details = entry.sensor + " is at optimal level.";
    } else if (entry.code === 20) {
      entry.details = entry.device + " has crashed.";
    } else if (entry.code === 21) {
      entry.details = entry.device + " has moved";
    }
    return entry;
  });
  return DetailsData;
}

export default function NotificationTable() {
  const [isDetailData, setDetailData] = useState([]);
  const [showDevice, setShowDevice] = useState(false);

  React.useEffect(() => {
    const DetailData = AddDetails(data);
    setDetailData(DetailData);
  }, []);

  const SensorNotifications = isDetailData.filter(
    item => item.type !== "device"
  );
  const DeviceNotifications = isDetailData.filter(
    item => item.type !== "sensor"
  );

  const handleClick = () => {
    setShowDevice(true);
  };

  const handleClick2 = () => {
    setShowDevice(false);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28vh auto"
          // gridGap: "2px"
        }}
      >
        <div>
          <Sidebar2 name="Notifications" />
        </div>
        <div>
          <Button
            variant="contained"
            // borderWidth={100}
            style={{ marginLeft: "4%", padding: "0.5%", marginTop: "10px" }}
            onClick={handleClick2}
            color={`${showDevice === false ? "success" : "primary"}`}
          >
            Sensor
          </Button>
          <Button
            style={{ marginLeft: "1%", padding: "0.5%", marginTop: "10px" }}
            variant="contained"
            // borderWidth={3}
            onClick={handleClick}
            color={`${showDevice === true ? "success" : "primary"}`}
            // sx={{border:"green"}}
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
    </div>
  );
}
