import React, { useEffect, useState, useContext } from "react";
import "../homepage/homepage.css";
import { Link } from "react-router-dom";
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
import data from "../notifications/NotificationBox/notification.json";
import RenderNotifications from "../notifications/NotificationBox/notification.js";
import { styled } from '@mui/system';
import UserContext from "../userAuth/UserContext";
import { Typography } from "@mui/material";

const Root = styled("div")(({ theme }) => ({
    "& .MuiPaper-root": {
        color: "black",
        height: 55
    }
}));

export default function Navbar() {
    const { user } = useContext(UserContext);  // Access the user property from UserContext

    // Display user's full name if available
    const userFullName = user && user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : "";

    // Display user's designation with parentheses
    const userDesignation = user && user.designation
        ? `(${user.designation})`
        : "";

    let [isNotification, setNotification] = useState(false);
    const notificationCount = Object.keys(data).length;
    const handleNotificationClick = () => {
        setNotification(!isNotification);
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
                                    <RenderNotifications data={data} />
                                </div>
                            )}
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                // onClick={handleProfileMenuOpen}
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
                {/* {renderMobileMenu} /}
{/ {renderMenu} */}
            </Box>
        </Root>
    );
}
