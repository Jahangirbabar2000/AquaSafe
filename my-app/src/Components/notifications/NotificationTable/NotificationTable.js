import React, { useEffect, useState, useContext, useMemo } from "react";
import { Button, Box } from "@mui/material";
import MainLayout from "../../Layout/MainLayout";
import SensorNotification from "./SensorNotifications";
import DeviceNotification from "./DeviceNotifications";
import { notificationsAPI } from "../../../services/api";
import UserContext from "../../userAuth/UserContext";

/**
 * NotificationTable - Displays user notifications with filter options for sensor/device types
 */
const NotificationTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDevice, setShowDevice] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await notificationsAPI.getAll();
      // Filter notifications based on user ID
      const filteredNotifications = response.data.filter(
        (notification) => notification.user === user.id
      );
      setNotifications(filteredNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const sensorNotifications = useMemo(
    () => notifications.filter((item) => item.type !== "device"),
    [notifications]
  );

  const deviceNotifications = useMemo(
    () => notifications.filter((item) => item.type !== "sensor"),
    [notifications]
  );

  const handleToggleView = (showDeviceView) => {
    setShowDevice(showDeviceView);
  };

  return (
    <MainLayout sidebarName="Notifications">
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          onClick={() => handleToggleView(false)}
          color={!showDevice ? "success" : "primary"}
          sx={{ minWidth: 120 }}
        >
          Sensor
        </Button>
        <Button
          variant="contained"
          onClick={() => handleToggleView(true)}
          color={showDevice ? "success" : "primary"}
          sx={{ minWidth: 120 }}
        >
          Device
        </Button>
      </Box>

      {showDevice ? (
        <DeviceNotification data={deviceNotifications} />
      ) : (
        <SensorNotification data={sensorNotifications} />
      )}
    </MainLayout>
  );
};

export default NotificationTable;

