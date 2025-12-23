import { useEffect, useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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
import axios from 'axios';

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
  const [projectId, setProjectId] = useState('');


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

  useEffect(() => {
    axios.get('http://localhost:8080/projects')
      .then(response => {
        // Update state with fetched notifications
        setProjectId(response.data[0].Id);
      })
      .catch(error => {
        console.error('There was an error fetching notifications!', error);
      });
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": { 
          background: "#2A3247",
          minHeight: "100vh"
        },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { 
          padding: "8px 20px 8px 20px !important",
          margin: "4px 0",
          borderRadius: "4px",
          transition: "all 0.2s ease-in-out"
        },
        "& .pro-inner-item:hover": { 
          color: "#EF7E18 !important",
          backgroundColor: "rgba(239, 126, 24, 0.1) !important"
        },
        "& .pro-menu-item.active": { 
          color: "#EF7E18 !important",
          backgroundColor: "rgba(239, 126, 24, 0.15) !important"
        },
        "& .pro-sidebar": {
          position: "fixed",
          height: "calc(100vh - 64px)",
          fontSize: { xs: "14px", sm: "16px" },
          zIndex: 1100,
          top: 64,
          left: 0,
          overflowY: "auto",
          overflowX: "hidden",
          width: "250px !important"
        },
        "& .pro-sidebar.collapsed": {
          width: "80px !important"
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
          <Box paddingLeft={isCollapsed ? undefined : { xs: "3%", sm: "5%" }}>
            {!isMobile && !isCollapsed && (
              <Typography variant="h6" sx={{
                margin: "15px 0 10px 20px",
                color: "rgba(255, 255, 255, 1)",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                fontWeight: 600
              }}>
                Projects
              </Typography>
            )}
            <Item
              title="Dashboard"
              to={`/dashboard/${projectId}`}
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
            {renderMenuItem('Local Admin', (
              <Item
                title="Create New Project"
                to="/newProject"
                icon={<ContentPasteRoundedIcon />}
                selected={selected}
                onClick={() => setSelected("Create New Project")}
              />
            ))}
            <Item
              title="Readings"
              to="/readings"
              icon={<TableRowsOutlinedIcon />}
              selected={selected}
              onClick={() => setSelected("Readings")}
            />
            {!isMobile && !isCollapsed && (
              <Typography
                variant="h6"
                sx={{
                  margin: "15px 0 10px 20px",
                  color: "rgba(255, 255, 255, 1)",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: 600
                }}
              >
                IoT
              </Typography>
            )}
            <Item
              title="Projects"
              to="/projects"
              icon={<SensorsRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Projects")}
            />
            <Item
              title="Parameters"
              to="/WaterQualityPage"
              icon={<ScienceRoundedIcon />}
              selected={selected}
              onClick={() => setSelected("Parameters")}
            />
            {!isMobile && !isCollapsed && (
              <Typography
                variant="h6"
                sx={{
                  margin: "15px 0 10px 20px",
                  color: "rgba(255, 255, 255, 1)",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: 600
                }}
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

            {/* <Item
              title="Tasks"
              to="/todos"
              icon={<EngineeringIcon />}
              selected={selected}
              onClick={() => setSelected("Tasks")}
            /> */}

            {!isMobile && !isCollapsed && renderMenuItem('Local Admin', (
              <Typography
                variant="h6"
                sx={{
                  margin: "15px 0 10px 20px",
                  color: "rgba(255, 255, 255, 1)",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: 600
                }}
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