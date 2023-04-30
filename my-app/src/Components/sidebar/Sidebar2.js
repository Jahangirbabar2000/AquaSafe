import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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
import UserContext from '../userAuth/UserContext'


const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{ color: "#f5f5ff" }}
      icon={icon}
      onClick={onClick} // Pass the onClick prop here
    >
      <Typography sx={{ fontSize: 16 }}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const Sidebar2 = (props) => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(props.name);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const renderMenuItem = (designation, item) => {
    if (user && user.designation === designation) {
      return item;
    }
    return null;
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove JWT token from local storage
    setUser(null); // Update userContext to null
    navigate('/'); // Navigate to homepage
  };


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
          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Typography variant="h6" color="#f5f5ff" sx={{ m: "15px 0 0 20px" }}>
              Projects
            </Typography>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<TvRoundedIcon />}
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
            />
            <Item
              title="Readings"
              to="/readings"
              icon={<TableRowsOutlinedIcon />}
              selected={selected}
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
            />
            <Item
              title="Projects"
              to="/projects"
              icon={<SensorsRoundedIcon />}
              selected={selected}
            />
            <Item
              title="Parameters"
              to="/parameters"
              icon={<ScienceRoundedIcon />}
              selected={selected}
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
            />
            {renderMenuItem('Local Admin', (
              <Typography
                variant="h6"
                color="#f5f5ff"
                sx={{ m: "15px 0 0 20px" }}
              >
                User Management
              </Typography>
            ))}
            {renderMenuItem('Local Admin', (
              <Item
                title="Users"
                to="/userstable"
                icon={<GroupIcon />}
                selected={selected}
              />
            ))}

            <Item
              title="Logout"
              icon={<LogoutRoundedIcon />}
              selected={selected}
              onClick={handleLogout}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar2;
