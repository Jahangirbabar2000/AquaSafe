import React from "react"
import "./homepage.css";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function Second() {
    return (
        <div className="more">
            <h2 id="heading" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', padding: '2rem 1rem 1rem' }}>See more. Learn More. Do more. </h2>
            {/* <PriorityHighIcon sx={{fontSize:40}} /> */}
            <div className="Info-container">
                <InfoBox icon={<PriorityHighIcon sx={{ fontSize: { xs: 60, sm: 80, md: 100 }, color: "#EF7E18" }} />} up="Get Alerts for critical Contamination" />
                <InfoBox icon={<NotificationsIcon sx={{ fontSize: { xs: 60, sm: 80, md: 100 }, color: "#EF7E18" }} />} up="Choose between push or regular interval notifications" />
                <InfoBox icon={<ManageAccountsIcon sx={{ fontSize: { xs: 60, sm: 80, md: 100 }, color: "#EF7E18" }} />} up="Manage user visibility and interactions" />
                <InfoBox icon={<ConstructionIcon sx={{ fontSize: { xs: 60, sm: 80, md: 100 }, color: "#EF7E18" }} />} up="Assign technicians to tasks as needed" />

            </div>
        </div>
    );
}

function InfoBox(props) {
    return (
        <div className="Info">
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                {props.icon}
            </div>
            <p style={{ margin: '15px 0', fontSize: "clamp(0.875rem, 2vw, 1.0625rem)", lineHeight: 1.5 }}>{props.up}</p>
        </div>
    );
}