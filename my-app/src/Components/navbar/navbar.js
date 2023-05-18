import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import aquasafeLogo from "../../AquaSafe.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import RenderNotifications from "../notifications/NotificationBox/notification.js";
import { styled } from '@mui/system';
import UserContext from "../userAuth/UserContext";
import { Typography, Menu, MenuItem } from "@mui/material";


const Root = styled("div")(({ theme }) => ({
    "& .MuiPaper-root": {
        color: "black",
        height: 55
    }
}));

export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isNotification, setNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);

    let unviewedNotifications = notifications.filter(notification => !notification.isViewed);
    let notificationCount = unviewedNotifications.length;

    useEffect(() => {
        fetchNotifications();
        const handleNotification = event => {
            console.log('Received a message from the service worker:', event.data);
            fetchNotifications();
        };

        navigator.serviceWorker.addEventListener('message', handleNotification);

        // Don't forget to remove the event listener when the component is unmounted
        return () => {
            navigator.serviceWorker.removeEventListener('message', handleNotification);
        };
    }, []);

    const fetchNotifications = () => {
        axios.get('http://localhost:8080/api/notifications')
            .then(response => {
                // Update state with fetched notifications
                setNotifications(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching notifications!', error);
            });
    }
    // Display user's full name if available
    const userFullName = user && user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : "";

    // Display user's designation with parentheses
    const userDesignation = user && user.designation
        ? `(${user.designation})`
        : "";

    const handleNotificationClick = () => {
        setNotification(!isNotification);
        if (!isNotification && unviewedNotifications.length > 0) {
            const unviewedNotificationIds = unviewedNotifications.map(notification => notification.id);
            axios.put('http://localhost:8080/api/notifications/view', { notificationIds: unviewedNotificationIds })
                .then(response => {
                    console.log('Notifications updated successfully');
                    // Set isViewed to true for all unviewed notifications in state
                    const updatedNotifications = notifications.map(notification =>
                        unviewedNotificationIds.includes(notification.id)
                            ? { ...notification, isViewed: true }
                            : notification
                    );
                    setNotifications(updatedNotifications);
                })
                .catch(error => {
                    console.error('There was an error updating notifications!', error);
                });
        }
    };


    const handleAccountMenuOpen = (event) => {
        if (isNotification) {
            setNotification(!isNotification);
        }
        setAnchorEl(event.currentTarget);
    };
    const handleAccountMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt'); // Remove JWT token from local storage
        setUser(null); // Update userContext to null
        navigate('/'); // Navigate to homepage
    };

    return (
        <Root>
            <Box sx={{ flexGrow: 1, paddingBottom: 7 }}>
                <AppBar position="fixed" sx={{ background: "white" }}>
                    <Toolbar>
                        <Link to="/homepage">
                            <img className="logo-img" src={aquasafeLogo} alt="logo" />
                        </Link>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ marginRight: 2 }}>
                            <Typography variant="h6" sx={{ color: "#00356B" }}>
                                {userFullName}
                                <span> </span>
                                <Typography component="span" variant="subtitle1" sx={{ color: "#777" }}>
                                    {userDesignation}
                                </Typography>
                            </Typography>
                        </Box>

                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Badge badgeContent={0} color="error">
                                    <MailIcon sx={{ color: "#00356B", fontSize: 30 }} />
                                </Badge>
                            </IconButton>

                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={notificationCount} color="error">
                                    <NotificationsIcon
                                        onClick={handleNotificationClick}
                                        sx={{ color: "#00356B", fontSize: 30 }}
                                    />
                                </Badge>
                            </IconButton>
                            {isNotification && (
                                <div className="notification-card">
                                    <RenderNotifications data={notifications} />
                                </div>
                            )}
                            <Menu
                                id="account-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleAccountMenuClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleAccountMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle sx={{ color: "#00356B", fontSize: 30 }} />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                // aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                // onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </Root>
    );
}
