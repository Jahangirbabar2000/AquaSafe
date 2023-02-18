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

export default function Sidebar(props) {
  const [selectedButton, setSelectedButton] = useState("");
  return (
    <div className="sidenav">
      <ul className="">
        <li>
          <Link to="/dashboard">
            <div
              // onClick={() => setSelectedButton("dashboard")}
              className={`${props.name === "dashboard" ? "highlight" : ""}`}
            >
              <TvRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Dashboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/newProject">
            <div
              // onClick={() => setSelectedButton("newproject")}
              className={`${props.name === "newproject" ? "highlight" : ""}`}
            >
              <ContentPasteRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Projects</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/sites">
            <div
              // onClick={() => setSelectedButton("sites")}
              className={`${props.name === "sites" ? "highlight" : ""}`}
            >
              <LocationOnRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Sites</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/deviceDeployment">
            <div
              // onClick={() => setSelectedButton("device")}
              className={`${props.name === "device" ? "highlight" : ""}`}
            >
              <RouterRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Devices</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/addSensor">
            <div
              // onClick={() => setSelectedButton("sensor")}
              className={`${"sensor" === props.name ? "highlight" : ""}`}
            >
              <SensorsRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Sensors</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <div
              className={`${"notification" === props.name ? "highlight" : ""}`}
            >
              <NotificationsRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Notifications</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/userstable">
            <div
              // onClick={() => setSelectedButton("users")}
              className={`${props.name === "users" ? "highlight" : ""}`}
            >
              <GroupIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Users</span>
            </div>
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
