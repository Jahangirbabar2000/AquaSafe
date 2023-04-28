import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import TvRoundedIcon from "@mui/icons-material/TvRounded";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import GroupIcon from "@mui/icons-material/Group";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import EngineeringIcon from "@mui/icons-material/Engineering";

const Item = ({ title, to, icon, selected, setSelected }) => {

  return (
    <MenuItem
      // onClick={() => setSelected(title)}
      active={selected === title}
      style={{
        color: "#f5f5ff"
      }}

      icon={icon}
    >
      <Typography sx={{ fontSize: 16 }}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar2 = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(props.name);

  // setSelected(props.name);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": { background: "#2A3247" },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#EF7E18 !important" },
        "& .pro-menu-item.active": { color: "#EF7E18 !important" },
        "& .pro-sidebar": {
          position: "fixed",// boxSizing: "border-box",
          height: "100vh",
          fontSize: "50px"
          // background:"blue"
        },
        "& .pro-sidebar.collapsed": { width: "100px" }
      }}>

      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          {/* <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon style={{ fontSize: 30 }} />
              ) : (
                undefined
              )
            }
            style={{
              margin: "10px 0 15px 7px",
              color: "#f5f5ff"
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{ color: "#f5f5ff" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem> */}

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Typography variant="h6" color="#f5f5ff" sx={{ m: "15px 0 0 20px" }}>
              Projects
            </Typography>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<TvRoundedIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sites"
              to="/sites"
              icon={<LocationOnRoundedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create New Project"
              to="/newProject"
              icon={<ContentPasteRoundedIcon />}
              selected={selected}
            // setSelected={setSelected}
            />
            <Item
              title="Readings"
              to="/readings"
              icon={<TableRowsOutlinedIcon />}
              selected={selected}
            // setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color="#f5f5ff"
              sx={{ m: "15px 0 0 20px" }}
            >
              IoT
            </Typography>
            <Item
              title="Devices"
              to="/deviceTemplate"
              icon={<RouterRoundedIcon />}
              selected={selected}
            // setSelected={setSelected}
            />
            <Item
              title="Projects"
              to="/projects"
              icon={<SensorsRoundedIcon />}
              selected={selected}
            // setSelected={setSelected}
            />

            <Item
              title="Parameters"
              to="/parameters"
              icon={<ScienceRoundedIcon />}
              selected={selected}
            // setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color="#f5f5ff"
              sx={{ m: "15px 0 0 20px" }}
            >
              Notifications
            </Typography>
            <Item
              title="Notifications"
              to="/notifications"
              icon={<NotificationsRoundedIcon />}
              selected={selected}
            // setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color="#f5f5ff"
              sx={{ m: "15px 0 0 20px" }}
            >
              User Management
            </Typography>
            <Item
              title="Users"
              to="/userstable"
              icon={<GroupIcon />}
              selected={selected}
            // setSelected={setSelected}
            />
            <Item
              title="Tasks"
              to="/todos"
              icon={<EngineeringIcon />}
              selected={selected}
            // setSelected={setSelected}
            />
            {/* <SubMenu
              icon={<MapOutlinedIcon />}
              style={{ color: "#f5f5ff" }}
              title="Submenu"
            >
              <Item
                title="item 1"
                to="/sites"
                icon={<MapOutlinedIcon />}
                selected={selected}
              // setSelected={setSelected}
              >
                {" "}
              </Item>
              <Item
                title="item 2"
                to="/sites"
                icon={<MapOutlinedIcon />}
                selected={selected}
              // setSelected={setSelected}
              >
                {" "}
              </Item>
            </SubMenu> */}
            {/* <br/> */}
            {/* <br/> */}
            <Item
              title="Logout"
              to="/homepage"
              icon={<LogoutRoundedIcon />}
              selected={selected}
            // setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar2;
