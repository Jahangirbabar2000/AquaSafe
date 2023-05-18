import React from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import './notification.css';

function getNotificationDetails(notification) {
  switch (notification.code) {
    case 10:
      return `${notification.sensor} is at dangerous level.`;
    case 11:
      return `${notification.sensor} is close to dangerous level.`;
    case 12:
      return `${notification.sensor} is at optimal level.`;
    case 20:
      return `${notification.device} has crashed.`;
    case 21:
      return `${notification.device} has moved.`;
    default:
      return '';
  }
}

function DisplayNotfication(props) {
  const notification = props.item;
  const details = getNotificationDetails(notification);

  return (
    <Card sx={{ marginBottom: '15px', minHeight: '30vh', px: '5px', transition: '0.3s', boxShadow: '0px 0px 20px rgba(0,0,0,0.1)', '&:hover': { backgroundColor: 'lightgrey' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            <Chip
              label={notification.status}
              color={notification.status === 'Urgent' ? 'error' : 'success'}
            />
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
            {new Date(notification.date).toLocaleString()}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">
          Device ID: {notification.device}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Location: {notification.location}
        </Typography>
        {/* <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>
          Details: {details}
        </Typography> */}
        {notification.description && <Typography variant="body2" sx={{ mt: 1 }}>
          Description: {notification.description}
        </Typography>}
      </CardContent>
    </Card>
  );
}

function RenderNotifications(props) {
  const notifications = props.data;

  return (
    <Box sx={{ zIndex: 100, backgroundColor: '#f5f5f5' }} className="notifications-container hidescroll">
      {notifications.map((entry) => (
        <DisplayNotfication key={entry.id} item={entry} />
      ))}
    </Box>
  );
}

export default RenderNotifications;
