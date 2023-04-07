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

  const [open, setOpen] = useState(false);
  const [openSensor, setOpenSensor] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickSensor = () => {
    setOpenSensor(!openSensor);
  };

  return (
    <div className="sidenav">
      <ul className="">
        <li>
          <Link to="/dashboard">
            <div className={`${props.name === "dashboard" ? "highlight" : ""}`}>
              <TvRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Dashboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/newProject">
            <div
              className={`${props.name === "newproject" ? "highlight" : ""}`}
            >
              <ContentPasteRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Projects</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/sites">
            <div className={`${props.name === "sites" ? "highlight" : ""}`}>
              <LocationOnRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Sites</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/deviceDeployment">
            <div className={`${props.name === "device" ? "highlight" : ""}`}>
              <RouterRoundedIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Devices</span>
            </div>
          </Link>
        </li>
        <li onClick={handleClickSensor}>
          {/* <Link to="/sensors"> */}
          <div className={`${"sensor" === props.name ? "highlight" : ""}`}>
            <SensorsRoundedIcon
              style={{ color: "#818181", fontSize: 20, marginLeft: "1.8vh" }}
            />
            <span className="sidebar-text">Sensors (expand)</span>
          </div>
          {/* </Link> */}
        </li>
        {/* Sensor children code starts here */}
        {openSensor && (
          <div className="Sidebar-item-child">
            <ul className="Sidebar-item-child-ul" style={{ marginLeft: 80 }}>
              <Link to="/sensors">
                {" "}
                <li>Add New Sensor</li>{" "}
              </Link>
              <Link to="">
              <li>dummy 2</li>
              </Link>
            </ul>
          </div>
        )}

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
            <div className={`${props.name === "users" ? "highlight" : ""}`}>
              <GroupIcon style={{ fontSize: 20 }} />
              <span className="sidebar-text">Users</span>
            </div>
          </Link>
        </li>
        <li id="logout" >
          <Link to="/homepage">
          <LogoutRoundedIcon style={{ fontSize: 20 }} />
          <span className="sidebar-text">Logout</span>
          </Link>
        </li>
        {/* {open && (
          <div className="Sidebar-item-child">
            <ul className="Sidebar-item-child-ul" style={{ marginLeft: 50 }}>
              <li>dummy 1</li>
              <li>dummy 2</li>
            </ul>
          </div>
        )} */}
      </ul>
    </div>
  );
}
