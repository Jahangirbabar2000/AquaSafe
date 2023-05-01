import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter } from "react-pro-sidebar";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
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
import EngineeringIcon from "@mui/icons-material/Engineering";
import UserContext from '../userAuth/UserContext';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Item = ({ title, to, icon, selected, onClick }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{ color: "#f5f5ff" }}
      icon={icon}
      onClick={onClick} // Pass the onClick prop here
    >
      <Typography variant="body1">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar2 = (props) => {
  const [selected, setSelected] = useState(props.name);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  console.log(isMobile);

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

  const iconButtonStyle = {
    color: 'rgba(255, 255, 255, 1)',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
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
          position: "fixed",
          height: "100vh",
          fontSize: "50px"
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        {isMobile && (
          <SidebarHeader style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={iconButtonStyle}
            >
              {isCollapsed ? <MenuIcon /> : <CloseIcon />}
            </IconButton>
          </SidebarHeader>
        )}
        <Menu iconShape="square">
          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            {!isMobile && (
              <Typography variant="h6" color="text.primary" sx={{ m: "15px 0 0 20px" }}>
                Projects
              </Typography>
            )}
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<TvRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Dashboard")}
            />
            <Item
              title="Sites"
              to="/sites"
              icon={<LocationOnRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Sites")}
            />
            <Item
              title="Create New Project"
              to="/newProject"
              icon={<ContentPasteRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Create New Project")}
            />
            <Item
              title="Readings"
              to="/readings"
              icon={<TableRowsOutlinedIcon />}
              selected={selected}
              onClick={() => setSelected("Readings")}
            />
            {!isMobile && (
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ m: "15px 0 0 20px" }}
              >
                IoT
              </Typography>
            )}
            <Item
              title="Devices"
              to="/deviceTemplate"
              icon={<RouterRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Devices")}
            />
            <Item
              title="Projects"
              to="/projects"
              icon={<SensorsRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Projects")}
            />
            <Item
              title="Parameters"
              to="/parameters"
              icon={<ScienceRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Parameters")}
            />
            {!isMobile && (
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ m: "15px 0 0 20px" }}
              >
                Notifications
              </Typography>
            )}
            <Item
              title="Notifications"
              to="/notifications"
              icon={<NotificationsRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Notifications")}
            />

            <Item
              title="Tasks"
              to="/todos"
              icon={<EngineeringIcon />}
              selected={selected}
              onClick={() => setSelected("Tasks")}
            />

            {renderMenuItem('Local Admin', (
              <Typography
                variant="h6"
                color="text.primary"
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
                onClick={() => setSelected("Users")}
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


        <SidebarFooter>
          {/* You can add any footer content here */}
        </SidebarFooter>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar2;