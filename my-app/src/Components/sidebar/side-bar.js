import React, { useState } from "react";
import "./side-bar.css";
import { Link } from "react-router-dom";

import TvRoundedIcon from "@mui/icons-material/TvRounded";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import GroupIcon from "@mui/icons-material/Group";

export default function Sidebar() {
  const [selectedButton, setSelectedButton] = useState(null);
  return (
    <div className="sidenav">
      <ul className="">
        <li>
          <Link to="/dashboard">
            <TvRoundedIcon style={{ fontSize: 20 }} />
            <span className="sidebar-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/sites">
            <ContentPasteRoundedIcon style={{ fontSize: 20 }} />
            <span className="sidebar-text">Projects</span>
          </Link>
        </li>
        <li>
          <Link to="/sites">
            <LocationOnRoundedIcon style={{ fontSize: 20 }} />
            <span className="sidebar-text">Sites</span>
          </Link>
        </li>
        <li>
          <Link to="/sites">
            <RouterRoundedIcon style={{ fontSize: 20 }} />
            <span className="sidebar-text">Devices</span>
          </Link>
        </li>
        <li>
          <Link to="/sites">
            <SensorsRoundedIcon style={{ fontSize: 20 }} />
            <span className="sidebar-text">Sensors</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <NotificationsRoundedIcon style={{ fontSize: 20 }} />
            <span className="sidebar-text">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/userstable">
            <GroupIcon style={{ fontSize: 20 }} />
            <span className="sidebar-text">Users</span>
          </Link>
        </li>
        <li id="logout">
          <Link to="/homepage">
            <LogoutRoundedIcon style={{ fontSize: 20 }} />
            <span className="sidebar-text">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
